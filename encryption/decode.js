// https://www.python-spider.com/challenge/new/js

let parse = require("@babel/parser").parse
let generate = require("@babel/generator").default
let traverse = require("@babel/traverse").default
const types = require("@babel/types");

let fs = require("fs")
let js_code = fs.readFileSync("fw.js", "utf-8")


let init_ast = parse(js_code)
let ast = parse(js_code)


//删除前四行无效代码
//var $_CJDe = LIuDu.$_Ca;
traverse(ast, {
    VariableDeclaration: function (path) {
        if (path.node.declarations.length === 1 && path.node.declarations[0].init) {
            if (path.node.declarations[0].init.computed === false) {
                //删除即可
                path.remove()

            }
        }
    }
})
//var $_CJCW = ["$_CJGo"].concat($_CJDe);
traverse(ast, {
    VariableDeclaration: function (path) {
        if (path.node.declarations.length === 1 && path.node.declarations[0].init) {
            if (path.node.declarations[0].init.callee && path.node.declarations[0].init.callee.computed === false) {
                //删除即可
                //console.log(path.node.declarations[0].init.callee.property.name)
                path.remove()

            }
        }
    }
})

//var $_CJER = $_CJCW[1];
traverse(ast, {
    VariableDeclaration: function (path) {
        if (path.node.declarations.length === 1 && path.node.declarations[0].init) {
            if (path.node.declarations[0].init.computed === true && path.node.declarations[0].init.property.type === "NumericLiteral") {
                //删除即可
                if (path.node.declarations[0].init.property.value === 1) {
                    path.remove()
                }


            }
        }
    }
})

//$_DAHHO.shift();
traverse(ast, {
    ExpressionStatement: function (path) {
        if (path.get("expression.type").node === "CallExpression" && path.get("expression.callee.type").node === "MemberExpression") {
            if (path.get("expression.callee.computed").node === false && path.get("expression.callee.property.name").node === "shift") {
                //删除即可
                // console.log(path.toString())
                //console.log(path.get("expression.callee.property.name").node)
                path.remove()
            }

        }
    }
})
//变量名替换
//$_DCEIg(1337)    mwbxQ.$_Cg
traverse(ast, {
    CallExpression: {
        exit: function (path) {
            if (path.node.arguments.length === 1 && path.node.callee.type === "Identifier") {
                if (path.node.arguments[0].type === "NumericLiteral") {
                    path.get("callee").replaceInline(types.memberExpression(types.Identifier("bobo"), types.Identifier("$_DBGGJ"), false)) //将函数名替换成bobo
                }
            }
        }
    }
})

//$_DCFER(296)


//LIuDu.$_AD写入到内存当中
traverse(ast, {
    ExpressionStatement: function (path) {
        if (path.get("expression.operator").node === "=" && path.get("expression.left.computed").node === false) {
            if (path.node.expression.left.object && path.node.expression.left.property) {
                if (path.node.expression.left.property.name === "$_Au") {
                    //
                    path.get("expression.left").replaceWith(types.Identifier("bobo"))
                    //console.log(path.toString())
                    eval(path.toString())
                }
            }

        }

    }
})
// console.log(bobo)
// 去除控制流平坦化


// Traverse the AST and collect variable declarations from switch cases
// Traverse the AST and process functions with the specified conditions
traverse(ast, {
        FunctionDeclaration(path) {
            let varDeclaration = null;
            let forLoop = null;
            let switchStatements = [];

            // Traverse the function body to find the specific pattern
            path.traverse({
                //var $_DCGCv = LIuDu.$_DV()[8][18];
                VariableDeclarator(path) {
                    if (path.node.init && path.node.init.type === "MemberExpression" && path.node.init.computed === true &&
                        path.node.init.object.object && path.node.init.object.object.type === "CallExpression"
                    ) {
                        if (path.node.init.object.object.callee.type === "MemberExpression" && path.node.init.object.object.callee.object && path.node.init.object.object.callee.object.name === 'mwbxQ') {
                            varDeclaration = path.parentPath;
                        }
                    }

                },
                //for (; $_DCGCv !== LIuDu.$_DV()[4][16];) {
                ForStatement(path) {
                    if (path.node.test && types.isBinaryExpression(path.node.test) && path.node.test.right.type === "MemberExpression" && path.node.test.right.object.object) {
                        if (path.node.test.right.object.object.type === "CallExpression" && path.node.test.right.object.object.callee && path.node.test.right.object.object.callee.object.name === 'mwbxQ') {
                            forLoop = path;
                            // path.get("test").remove()
                        }

                    }
                },
                SwitchCase(path) {
                    if (path.parentPath && path.parentPath.parentPath && path.node.consequent) {
                        for (let i = 0; i < path.node.consequent.length; i++) {
                            if (path.node.consequent[i].type !== "BreakStatement") {
                                //console.log(path.node.consequent[i])
                                switchStatements.push(path.node.consequent[i]);
                            }

                        }

                    }
                }
            });

            // If the pattern matches, process the switch cases and replace the function body
            if (varDeclaration && forLoop && switchStatements.length > 0) {
                const newBody = types.blockStatement(switchStatements);
                path.get('body').replaceWith(newBody);
            }
        }
    }
);

//执行bobo函数
traverse(ast, {
    CallExpression: function (path) {
        if (path.node.callee.object && path.node.callee.object.name === "bobo") {
            //console.log(path.toString())
            result = eval(path.toString())
            if (typeof result === "string") {
                path.replaceInline({type: "StringLiteral", value: result})
            }


        }
    }
})

//去除mwbxQ.$_DW()[6][12];
traverse(ast, {
    ExpressionStatement: function (path) {
        if (path.get("expression.type").node === "AssignmentExpression" && path.get("expression.operator").node === "=") {
            if (path.node.expression.right.object && path.node.expression.right.object.type === "MemberExpression") {
                console.log(path.node.expression.right.object.object.callee)
                if (path.node.expression.right.object.object.callee && path.node.expression.right.object.object.callee.property.name === "$_DW") {
                    //删除即可
                    path.remove()
                }
            }

        }
    }
})
let decode_code = generate(ast, {minified: false}).code
fs.writeFileSync("output.js", decode_code)
