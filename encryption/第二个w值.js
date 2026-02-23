window = global;
delete global;
delete Buffer;
var CryptoJS = require("crypto-js")
function $_DJs(e) {
    this["$_BAEj"] = e || [];
}

function $_EHp(e) {
    var t = this["$_BAEj"];
    if (t["indexOf"])
        return t["indexOf"](e);
    for (var n = 0, r = t["length"]; n < r; n += 1)
        if (t[n] === e)
            return n;
    return -1;
}

function $_EBo(e) {
    var t = [
        "textLength",
        "HTMLLength",
        "documentMode",
        "A",
        "ARTICLE",
        "ASIDE",
        "AUDIO",
        "BASE",
        "BUTTON",
        "CANVAS",
        "CODE",
        "IFRAME",
        "IMG",
        "INPUT",
        "LABEL",
        "LINK",
        "NAV",
        "OBJECT",
        "OL",
        "PICTURE",
        "PRE",
        "SECTION",
        "SELECT",
        "SOURCE",
        "SPAN",
        "STYLE",
        "TABLE",
        "TEXTAREA",
        "VIDEO",
        "screenLeft",
        "screenTop",
        "screenAvailLeft",
        "screenAvailTop",
        "innerWidth",
        "innerHeight",
        "outerWidth",
        "outerHeight",
        "browserLanguage",
        "browserLanguages",
        "systemLanguage",
        "devicePixelRatio",
        "colorDepth",
        "userAgent",
        "cookieEnabled",
        "netEnabled",
        "screenWidth",
        "screenHeight",
        "screenAvailWidth",
        "screenAvailHeight",
        "localStorageEnabled",
        "sessionStorageEnabled",
        "indexedDBEnabled",
        "CPUClass",
        "platform",
        "doNotTrack",
        "timezone",
        "canvas2DFP",
        "canvas3DFP",
        "plugins",
        "maxTouchPoints",
        "flashEnabled",
        "javaEnabled",
        "hardwareConcurrency",
        "jsFonts",
        "timestamp",
        "performanceTiming",
        "internalip",
        "mediaDevices",
        "DIV",
        "P",
        "UL",
        "LI",
        "SCRIPT",
        "touchEvent"
    ]
    if (t["map"])
        return new $_DJs(t["map"](e));
    for (var n = [], r = 0, o = t["length"]; r < o; r += 1)
        n[r] = e(t[r], r, this);
    return new $_DJs(n);
}

$_DJs.prototype.$_EHp = $_EHp;
$_DJs.prototype.$_EBo = $_EBo;

function $_BHJM(e) {
    var t = "";
    var n = 0;
    (e || [])["length"];
    while (!t && e[n]) {
        t = e[n] && e[n][4];
        n++;
    }
    if (!t)
        return e;
    for (var r = "", o = ["mouse", "touch", "pointer", "MSPointer"], i = 0, s = o["length"]; i < s; i++)
        if (0 === t["indexOf"](o[i])) {
            r = o[i];
        }
    for (var a = e["slice"](), _ = a["length"] - 1; 0 <= _; _--) {
        var c = a[_];
        var l = c[0];
        if (-1 < new $_DJs(["move", "down", "up"])["$_EHp"](l))
            if (0 !== (c[4] || "")["indexOf"](r)) {
                a["splice"](_, 1);
            }
    }
    return a;
}

function $_BHHV(e) {
    var t = 32767;
    return "number" != typeof e ? e : (t < e ? e = t : e < -t && (e = -t),
        Math["round"](e));
}

function $_BHIQ(e) {
    var t = 0;
    var n = 0;
    var r = [];
    var o = this;
    var i = 0;
    if (e["length"] <= 0)
        return [];
    for (var s = null, a = null, _ = $_BHJM(e), c = _["length"], l = c < 300 ? 0 : c - 300; l < c; l += 1) {
        var u = _[l];
        var p = u[0];
        if (-1 < new $_DJs(["down", "move", "up", "scroll"])["$_EHp"](p)) {
            s || (s = u);
            a = u;
            r["push"]([p, [u[1] - t, u[2] - n], $_BHHV(i ? u[3] - i : i)]);
            t = u[1];
            n = u[2];
            i = u[3];
        } else {
            if (-1 < new $_DJs(["blur", "focus", "unload"])["$_EHp"](p)) {
                r["push"]([p, $_BHHV(i ? u[1] - i : i)]);
                i = u[1];
            }
        }
    }
    return o["$_BGBO"] = s,
        o["$_BGCI"] = a,
        r;
}

function $_HDn(e) {
    var p = {
        "move": 0,
        "down": 1,
        "up": 2,
        "scroll": 3,
        "focus": 4,
        "blur": 5,
        "unload": 6,
        "unknown": 7
    };

    function h(e, t) {
        for (var n = String(e)["toString"](2), r = "", o = n["length"] + 1; o <= t; o += 1)
            r += "0";
        return n = r + n;
    }

    function f(e) {
        var t = [];
        var n = e["length"];
        var r = 0;
        while (r < n) {
            var o = e[r];
            var i = 0;
            while (1) {
                if (16 <= i)
                    break;
                var s = r + i + 1;
                if (n <= s)
                    break;
                if (e[s] !== o)
                    break;
                i += 1;
            }
            r = r + 1 + i;
            var a = p[o];
            if (0 != i) {
                t["push"](8 | a);
                t["push"](i - 1);
            } else {
                t["push"](a);
            }
        }
        for (var _ = h(32768 | n, 16), c = "", l = 0, u = t["length"]; l < u; l += 1)
            c += h(t[l], 4);
        return _ + c;
    }

    function c(e, t) {
        for (var n = [], r = 0, o = e["length"]; r < o; r += 1)
            n["push"](t(e[r]));
        return n;
    }

    function d(e, t) {
        e = function _(e) {
            var t = 32767;
            var n = (e = c(e, function (e) {
                return t < e ? t : e < -t ? -t : e;
            }))["length"];
            var r = 0;
            var o = [];
            while (r < n) {
                var i = 1;
                var s = e[r];
                var a = Math["abs"](s);
                while (1) {
                    if (n <= r + i)
                        break;
                    if (e[r + i] !== s)
                        break;
                    if (127 <= a || 127 <= i)
                        break;
                    i += 1;
                }
                1 < i ? o["push"]((s < 0 ? 49152 : 32768) | i << 7 | a) : o["push"](s);
                r += i;
            }
            return o;
        }(e);
        var n;
        var r = [];
        var o = [];
        c(e, function (e) {
            var t = Math["ceil"](function n(e, t) {
                return 0 === e ? 0 : Math["log"](e) / Math["log"](t);
            }(Math["abs"](e) + 1, 16));
            0 === t && (t = 1);
            r["push"](h(t - 1, 2));
            o["push"](h(Math["abs"](e), 4 * t));
        });
        var i = r["join"]("");
        var s = o["join"]("");
        return t ? n = c(function a(e, t) {
            var n = [];
            return c(e, function (e) {
                if (t(e)) {
                    n["push"](e);
                }
            }),
                n;
        }(e, function (e) {
            return 0 != e && e >> 15 != 1;
        }), function (e) {
            return e < 0 ? "1" : "0";
        })["join"]("") : n = "",
        h(32768 | e["length"], 16) + i + s + n;
    }

    return function (e) {
        for (var t = [], n = [], r = [], o = [], i = 0, s = e["length"]; i < s; i += 1) {
            var a = e[i];
            var _ = a["length"];
            t["push"](a[0]);
            n["push"](2 === _ ? a[1] : a[2]);
            3 === _ && (r["push"](a[1][0]),
                o["push"](a[1][1]));
        }
        var c = f(t) + d(n, !1) + d(r, !0) + d(o, !0);
        var l = c["length"];
        return l % 6 != 0 && (c += h(0, 6 - l % 6)),
            function u(e) {
                for (var t = "", n = e["length"] / 6, r = 0; r < n; r += 1)
                    t += "()*,-./0123456789:?@ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz~"["charAt"](window["parseInt"](e["slice"](6 * r, 6 * (r + 1)), 2));
                return t;
            }(c);
    }(e);
}

function $_BIBN() {
    var e = [
        [
            "move",
            727,
            116,
            1719646523142,
            "pointermove"
        ],
        [
            "move",
            728,
            115,
            1719646523149,
            "pointermove"
        ],
        [
            "down",
            728,
            115,
            1719646523190,
            "pointerdown"
        ],
        [
            "up",
            728,
            115,
            1719646523237,
            "pointerup"
        ]
    ]
    return this["$_BAEj"] = [],
        $_HDn($_BHIQ(e));
}

function $_BICN() {
    return $_HDn([]);
}

function $_BJAQ() {
    var $_BIIQ = [
        "A",
        "ARTICLE",
        "ASIDE",
        "AUDIO",
        "BASE",
        "BUTTON",
        "CANVAS",
        "CODE",
        "IFRAME",
        "IMG",
        "INPUT",
        "LABEL",
        "LINK",
        "NAV",
        "OBJECT",
        "OL",
        "PICTURE",
        "PRE",
        "SECTION",
        "SELECT",
        "SOURCE",
        "SPAN",
        "STYLE",
        "TABLE",
        "TEXTAREA",
        "VIDEO"
    ];
    var $_BIJu = [
        "DIV",
        "P",
        "UL",
        "LI",
        "SCRIPT"
    ]
    return ["textLength", "HTMLLength", "documentMode"]["concat"]($_BIIQ)["concat"](["screenLeft", "screenTop", "screenAvailLeft", "screenAvailTop", "innerWidth", "innerHeight", "outerWidth", "outerHeight", "browserLanguage", "browserLanguages", "systemLanguage", "devicePixelRatio", "colorDepth", "userAgent", "cookieEnabled", "netEnabled", "screenWidth", "screenHeight", "screenAvailWidth", "screenAvailHeight", "localStorageEnabled", "sessionStorageEnabled", "indexedDBEnabled", "CPUClass", "platform", "doNotTrack", "timezone", "canvas2DFP", "canvas3DFP", "plugins", "maxTouchPoints", "flashEnabled", "javaEnabled", "hardwareConcurrency", "jsFonts", "timestamp", "performanceTiming", "internalip", "mediaDevices"])["concat"]($_BIJu)["concat"](["touchEvent"]);

}

function $_BIHp(e) {
    return void 0 === e;
}

function $_BICN2(e, t) {
    var r = {};
    var o = [];

    return new $_DJs($_BJAQ())["$_EBo"](function (e) {
        var t = r[e];
        o["push"]($_BIHp(t) ? -1 : t);
    }),
        o["join"]("magic data");
}

function $_BIBN2() {
    var e = ["DIV_0"] || [];
    return this["$_BGJ"] = [],
        this["$_BGIn"] = 0,
        this["$_BGJK"] = [],
        false,
        e["join"]("|");

}

function $_Gt() {
    return new Date()["getTime"]();
}

function H(e) {
    function _(e, t) {
        return e << t | e >>> 32 - t;
    }

    function c(e, t) {
        var n;
        var r;
        var o;
        var i;
        var s;
        return o = 2147483648 & e,
            i = 2147483648 & t,
            s = (1073741823 & e) + (1073741823 & t),
            (n = 1073741824 & e) & (r = 1073741824 & t) ? 2147483648 ^ s ^ o ^ i : n | r ? 1073741824 & s ? 3221225472 ^ s ^ o ^ i : 1073741824 ^ s ^ o ^ i : s ^ o ^ i;
    }

    function t(e, t, n, r, o, i, s) {
        return c(_(e = c(e, c(c(function a(e, t, n) {
            return e & t | ~e & n;
        }(t, n, r), o), s)), i), t);
    }

    function n(e, t, n, r, o, i, s) {
        return c(_(e = c(e, c(c(function a(e, t, n) {
            return e & n | t & ~n;
        }(t, n, r), o), s)), i), t);
    }

    function r(e, t, n, r, o, i, s) {
        return c(_(e = c(e, c(c(function a(e, t, n) {
            return e ^ t ^ n;
        }(t, n, r), o), s)), i), t);
    }

    function o(e, t, n, r, o, i, s) {
        return c(_(e = c(e, c(c(function a(e, t, n) {
            return t ^ (e | ~n);
        }(t, n, r), o), s)), i), t);
    }

    function i(e) {
        var t;
        var n = "";
        var r = "";
        for (t = 0; t <= 3; t++)
            n += (r = "0" + (e >>> 8 * t & 255)["toString"](16))["substr"](r["length"] - 2, 2);
        return n;
    }

    var s;
    var a;
    var l;
    var u;
    var p;
    var h;
    var f;
    var d;
    var g;
    var v;
    for (s = function m(e) {
        var t;
        var n = e["length"];
        var r = n + 8;
        var o = 16 * (1 + (r - r % 64) / 64);
        var i = Array(o - 1);
        var s = 0;
        var a = 0;
        while (a < n) {
            s = a % 4 * 8;
            i[t = (a - a % 4) / 4] = i[t] | e["charCodeAt"](a) << s;
            a++;
        }
        return s = a % 4 * 8,
            i[t = (a - a % 4) / 4] = i[t] | 128 << s,
            i[o - 2] = n << 3,
            i[o - 1] = n >>> 29,
            i;
    }(e = function x(e) {
        e = e["replace"](/\r\n/g, "\n");
        for (var t = "", n = 0; n < e["length"]; n++) {
            var r = e["charCodeAt"](n);
            if (r < 128) {
                t += String["fromCharCode"](r);
            } else {
                127 < r && r < 2048 ? t += String["fromCharCode"](r >> 6 | 192) : (t += String["fromCharCode"](r >> 12 | 224),
                    t += String["fromCharCode"](r >> 6 & 63 | 128));
                t += String["fromCharCode"](63 & r | 128);
            }
        }
        return t;
    }(e)),
             f = 1732584193,
             d = 4023233417,
             g = 2562383102,
             v = 271733878,
             a = 0; a < s["length"]; a += 16) {
        d = o(d = o(d = o(d = o(d = r(d = r(d = r(d = r(d = n(d = n(d = n(d = n(d = t(d = t(d = t(d = t(u = d, g = t(p = g, v = t(h = v, f = t(l = f, d, g, v, s[a + 0], 7, 3614090360), d, g, s[a + 1], 12, 3905402710), f, d, s[a + 2], 17, 606105819), v, f, s[a + 3], 22, 3250441966), g = t(g, v = t(v, f = t(f, d, g, v, s[a + 4], 7, 4118548399), d, g, s[a + 5], 12, 1200080426), f, d, s[a + 6], 17, 2821735955), v, f, s[a + 7], 22, 4249261313), g = t(g, v = t(v, f = t(f, d, g, v, s[a + 8], 7, 1770035416), d, g, s[a + 9], 12, 2336552879), f, d, s[a + 10], 17, 4294925233), v, f, s[a + 11], 22, 2304563134), g = t(g, v = t(v, f = t(f, d, g, v, s[a + 12], 7, 1804603682), d, g, s[a + 13], 12, 4254626195), f, d, s[a + 14], 17, 2792965006), v, f, s[a + 15], 22, 1236535329), g = n(g, v = n(v, f = n(f, d, g, v, s[a + 1], 5, 4129170786), d, g, s[a + 6], 9, 3225465664), f, d, s[a + 11], 14, 643717713), v, f, s[a + 0], 20, 3921069994), g = n(g, v = n(v, f = n(f, d, g, v, s[a + 5], 5, 3593408605), d, g, s[a + 10], 9, 38016083), f, d, s[a + 15], 14, 3634488961), v, f, s[a + 4], 20, 3889429448), g = n(g, v = n(v, f = n(f, d, g, v, s[a + 9], 5, 568446438), d, g, s[a + 14], 9, 3275163606), f, d, s[a + 3], 14, 4107603335), v, f, s[a + 8], 20, 1163531501), g = n(g, v = n(v, f = n(f, d, g, v, s[a + 13], 5, 2850285829), d, g, s[a + 2], 9, 4243563512), f, d, s[a + 7], 14, 1735328473), v, f, s[a + 12], 20, 2368359562), g = r(g, v = r(v, f = r(f, d, g, v, s[a + 5], 4, 4294588738), d, g, s[a + 8], 11, 2272392833), f, d, s[a + 11], 16, 1839030562), v, f, s[a + 14], 23, 4259657740), g = r(g, v = r(v, f = r(f, d, g, v, s[a + 1], 4, 2763975236), d, g, s[a + 4], 11, 1272893353), f, d, s[a + 7], 16, 4139469664), v, f, s[a + 10], 23, 3200236656), g = r(g, v = r(v, f = r(f, d, g, v, s[a + 13], 4, 681279174), d, g, s[a + 0], 11, 3936430074), f, d, s[a + 3], 16, 3572445317), v, f, s[a + 6], 23, 76029189), g = r(g, v = r(v, f = r(f, d, g, v, s[a + 9], 4, 3654602809), d, g, s[a + 12], 11, 3873151461), f, d, s[a + 15], 16, 530742520), v, f, s[a + 2], 23, 3299628645), g = o(g, v = o(v, f = o(f, d, g, v, s[a + 0], 6, 4096336452), d, g, s[a + 7], 10, 1126891415), f, d, s[a + 14], 15, 2878612391), v, f, s[a + 5], 21, 4237533241), g = o(g, v = o(v, f = o(f, d, g, v, s[a + 12], 6, 1700485571), d, g, s[a + 3], 10, 2399980690), f, d, s[a + 10], 15, 4293915773), v, f, s[a + 1], 21, 2240044497), g = o(g, v = o(v, f = o(f, d, g, v, s[a + 8], 6, 1873313359), d, g, s[a + 15], 10, 4264355552), f, d, s[a + 6], 15, 2734768916), v, f, s[a + 13], 21, 1309151649), g = o(g, v = o(v, f = o(f, d, g, v, s[a + 4], 6, 4149444226), d, g, s[a + 11], 10, 3174756917), f, d, s[a + 2], 15, 718787259), v, f, s[a + 9], 21, 3951481745);
        f = c(f, l);
        d = c(d, u);
        g = c(g, p);
        v = c(v, h);
    }
    return (i(f) + i(d) + i(g) + i(v))["toLowerCase"]();
    return e << t | e >>> 32 - t;
    var n;
    var r;
    var o;
    var i;
    var s;
    return o = 2147483648 & e,
        i = 2147483648 & t,
        s = (1073741823 & e) + (1073741823 & t),
        (n = 1073741824 & e) & (r = 1073741824 & t) ? 2147483648 ^ s ^ o ^ i : n | r ? 1073741824 & s ? 3221225472 ^ s ^ o ^ i : 1073741824 ^ s ^ o ^ i : s ^ o ^ i;
    return c(_(e = c(e, c(c(function a(e, t, n) {
        return e & t | ~e & n;
    }(t, n, r), o), s)), i), t);
    return c(_(e = c(e, c(c(function a(e, t, n) {
        return e & n | t & ~n;
    }(t, n, r), o), s)), i), t);
    return c(_(e = c(e, c(c(function a(e, t, n) {
        return e ^ t ^ n;
    }(t, n, r), o), s)), i), t);
    return c(_(e = c(e, c(c(function a(e, t, n) {
        return t ^ (e | ~n);
    }(t, n, r), o), s)), i), t);
    var t;
    var n = "";
    var r = "";
    for (t = 0; t <= 3; t++)
        n += (r = "0" + (e >>> 8 * t & 255)["toString"](16))["substr"](r["length"] - 2, 2);
    return n;
}

function get_$_CECC(gt,challenge) {
    var i = this;
    var e = $_BIBN();
    var t = $_BICN();
    var r = $_BIBN2();
    var n = $_BICN2();
    var o = {
        "$_BJBl": 1719652463322,
        "protocol": "https://",
        "gt": gt,
        "challenge": challenge,
        "offline": false,
        "new_captcha": true,
        "product": "float",
        "width": "300px",
        "https": true,
        "api_server": "api.geetest.com",
        "type": "fullpage",
        "static_servers": [
            "static.geetest.com",
            "static.geevisit.com"
        ],
        "beeline": "/static/js/beeline.1.0.1.js",
        "voice": "/static/js/voice.1.2.4.js",
        "click": "/static/js/click.3.1.0.js",
        "fullpage": "/static/js/fullpage.9.1.9-devcs9.js",
        "slide": "/static/js/slide.7.9.2.js",
        "geetest": "/static/js/geetest.6.0.9.js",
        "aspect_radio": {
            "slide": 103,
            "click": 128,
            "voice": 128,
            "beeline": 50
        },
        "cc": 20,
        "supportWorker": true,
        "$_FFW": {
            "pt": 0
        },
        "aeskey": "d012da598debf3cc",
        "theme": "wind",
        "theme_version": "1.5.8",
        "logo": true,
        "feedback": "https://www.geetest.com/contact#report",
        "c": [
            12,
            58,
            98,
            36,
            43,
            95,
            62,
            15,
            12
        ],
        "s": "2f4a303f",
        "i18n_labels": {
            "copyright": "由极验提供技术支持",
            "error": "网络不给力",
            "error_content": "请点击此处重试",
            "error_title": "网络超时",
            "fullpage": "智能检测中",
            "goto_cancel": "取消",
            "goto_confirm": "前往",
            "goto_homepage": "是否前往验证服务Geetest官网",
            "loading_content": "智能验证检测中",
            "next": "正在加载验证",
            "next_ready": "请完成验证",
            "read_reversed": false,
            "ready": "点击按钮进行验证",
            "refresh_page": "页面出现错误啦！要继续操作，请刷新此页面",
            "reset": "请点击重试",
            "success": "验证成功",
            "success_title": "通过验证"
        }
    };
    var s = $_Gt() - 1719652461898;
    i["$_CECC"] = "";
    var $_CEDJ = {
    "v": "9.1.9-devcs9",
    "te": false,
    "$_BBE": true,
    "ven": "Google Inc. (Intel)",
    "ren": "ANGLE (Intel, Intel(R) Iris(R) Xe Graphics (0x000046A6) Direct3D11 vs_5_0 ps_5_0, D3D11)",
    "fp": null,
    "lp": null,
    "em": {
        "ph": 0,
        "cp": 0,
        "ek": "11",
        "wd": 1,
        "nt": 0,
        "si": 0,
        "sc": 0
    },
    "tm": {
        "a": 1719837041982,
        "b": 1719837042512,
        "c": 1719837042512,
        "d": 0,
        "e": 0,
        "f": 1719837041985,
        "g": 1719837041985,
        "h": 1719837041985,
        "i": 1719837041985,
        "j": 1719837041985,
        "k": 0,
        "l": 1719837041992,
        "m": 1719837042500,
        "n": 1719837042509,
        "o": 1719837042513,
        "p": 1719837042988,
        "q": 1719837042988,
        "r": 1719837043069,
        "s": 1719837043171,
        "t": 1719837043171,
        "u": 1719837043171
    },
    "dnf": "dnf",
    "by": 0
}
    var $_CCFB = "-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1"
    for (var a = [["lang", "zh-cn"], ["type", "fullpage"], ["tt", function (e, t, n) {
        if (!t || !n)
            return e;
        var r;
        var o = 0;
        var i = e;
        var s = t[0];
        var a = t[2];
        var _ = t[4];
        while (r = n["substr"](o, 2)) {
            o += 2;
            var c = parseInt(r, 16);
            var l = String["fromCharCode"](c);
            var u = (s * c * c + a * c + _) % e["length"];
            i = i["substr"](0, u) + l + i["substr"](u);
        }
        return i;
    }(e, o["c"], o["s"]) || -1], ["light", r || -1], ["s", H($_HDn(t))], ["h", H($_HDn(n))], ["hh", H(n)], ["hi", H($_CCFB)], ["vip_order", undefined || -1], ["ct", i["ct"] || -1], ["ep", $_CEDJ || -1], ["passtime", s || -1], ["rp", H(o["gt"] + o["challenge"] + s)]], _ = 0; _ < a["length"]; _++)
        i["$_CECC"] += "\"" + a[_][0] + "\":" + JSON["stringify"](a[_][1]) + ",";
    return i["$_CECC"]
}

function get_r(gt, challenge) {
    var t = ["bbOy"];
    t["push"](""["toString"]());
    var r = '';
    //在console中直接运行o['toString']()、n['toString']()和e['toString']()获取定值,然后替换掉变量r定义中的相关toString的内容
    var o_string_code = "function o(e,t){var $_CFHIR=LIuDu.$_Ca,$_CFHHD=['$_CFIBo'].concat($_CFHIR),$_CFHJt=$_CFHHD[1];$_CFHHD.shift();var $_CFIAb=$_CFHHD[0];function n(e){var $_DDHGN=LIuDu.$_DV()[8][18];for(;$_DDHGN!==LIuDu.$_DV()[4][15];){switch($_DDHGN){case LIuDu.$_DV()[4][18]:var t=5381,n=e[$_CFHJt(52)],r=0;$_DDHGN=LIuDu.$_DV()[4][17];break;case LIuDu.$_DV()[0][17]:while(n--)t=(t<<5)+t+e[$_CFHIR(43)](r++);$_DDHGN=LIuDu.$_DV()[12][16];break;case LIuDu.$_DV()[4][16]:return t&=~(1<<31);break;}}}100<new Date()[$_CFHJt(257)]()-t[$_CFHIR(257)]()&&(e=$_CFHJt(1119)),r=$_CFHJt(707)+i[$_CFHIR(1184)]+$_CFHJt(1180)+n(o[$_CFHJt(0)]()+n(n[$_CFHJt(0)]())+n(e[$_CFHJt(0)]()))+$_CFHJt(1158);}";
    var n_string_code = 'function n(e){var $_DDHGN=LIuDu.$_DV()[8][18];for(;$_DDHGN!==LIuDu.$_DV()[4][15];){switch($_DDHGN){case LIuDu.$_DV()[4][18]:var t=5381,n=e[$_CFHJt(52)],r=0;$_DDHGN=LIuDu.$_DV()[4][17];break;case LIuDu.$_DV()[0][17]:while(n--)t=(t<<5)+t+e[$_CFHIR(43)](r++);$_DDHGN=LIuDu.$_DV()[12][16];break;case LIuDu.$_DV()[4][16]:return t&=~(1<<31);break;}}}';
    var e_string_code = 'bbOy';
    //下面是一个自运行函数，将t['shift'](), new Date()传递给了e和t这两个形参
    !function o(e, t) {
        function n(e) {
            var t = 5381;
            var n = e["length"];
            var r = 0;
            while (n--)
                t = (t << 5) + t + e["charCodeAt"](r++);
            return t &= ~-2147483648;
        }

        100 < new Date()["getTime"]() - t["getTime"]() && (e = "qwe");
        r = "{" + get_$_CECC(gt, challenge) + "\"captcha_token\":\"" + n(o_string_code + n(n_string_code) + n(e_string_code)) + "\",\"w6nw\":\"fkplx5pf\"}";
    }(t["shift"](), new Date());
    return r;
}
function encrypt(word, key0) {
    var key = CryptoJS.enc.Utf8.parse(key0);  //十六位十六进制数作为密钥
    var iv = CryptoJS.enc.Utf8.parse("0000000000000000");   //十六位十六进制数作为密钥偏移量
    let srcs = CryptoJS.enc.Utf8.parse(word);
    let r = CryptoJS.AES.encrypt(srcs, key, {iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7});
        var o = r['ciphertext']['words'];
    var i = r['ciphertext']['sigBytes'];

    var s = [];
    var a = 0;
    for (; a < i; a++) {
        var _ = o[a >>> 2] >>> 24 - a % 4 * 8 & 255;
        s['push'](_);
    }
    return s;
}
function $_GJQ(e) {
        var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789()";
        return e < 0 || e >= t["length"] ? "." : t["charAt"](e);
      }
function $_HBB(e, t) {
        return e >> t & 1;
      }
function $_HCO(e, o) {
        var i = this;
        o || (o = i);
        for (var t = function (e, t) {
            for (var n = 0, r = 24 - 1; 0 <= r; r -= 1) if (1 === $_HBB(t, r)) {
              n = (n << 1) + $_HBB(e, r);
            }
            return n;
          }, n = "", r = "", s = e["length"], a = 0; a < s; a += 3) {
          var _;
          if (a + 2 < s) {
            _ = (e[a] << 16) + (e[a + 1] << 8) + e[a + 2];
            n += $_GJQ(t(_, 7274496)) + $_GJQ(t(_, 9483264)) + $_GJQ(t(_, 19220)) + $_GJQ(t(_, 235));
          } else {
            var c = s % 3;
            if (2 == c) {
              _ = (e[a] << 16) + (e[a + 1] << 8);
              n += $_GJQ(t(_, 7274496)) + $_GJQ(t(_, 9483264)) + $_GJQ(t(_, 19220));
              r = '.';
            } else {
              if (1 == c) {
                _ = e[a] << 16;
                n += $_GJQ(t(_, 7274496)) + $_GJQ(t(_, 9483264));
                r = "..";
              }
            }
          }
        }
        return {
          "res": n,
          "end": r
        };
      }
function $_HET(e) {
        var t = $_HCO(e);
        return t["res"] + t["end"];
      }
function get_sec_w(gt, challenge, aeskey) {
    var n = {};
    var r = get_r(gt, challenge);
    console.log(r)
    n["gt"] = gt;
    n["challenge"] = challenge;
    n["lang"] = "zh-cn";
    n["pt"] = 0;
    n["client_type"] = "web";
    n["w"] = $_HET(encrypt(r, aeskey))
    return n
}

// console.log(get_sec_w("019924a82c70bb123aae90d483087f94","ad714f2145218c099588d64722bc0aca","86bee500dbe1691f"))