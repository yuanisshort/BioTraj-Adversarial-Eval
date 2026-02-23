var CryptoJS = require("crypto-js")

window = global;
delete global;
navigator = {
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 Edg/126.0.0.0',
    platform: "Win32",
    language: "zh-CN",
    languages: ["zh-CN"],
    onLine: true,
    cookieEnabled: true,
    doNotTrack: "1",
    vendor: "Google Inc.",
    vendorSub: "",
    product: "Gecko",
    appname: 'Netscape'
}

var X = function () {
    function n() {
        this["i"] = 0;
        this["j"] = 0;
        this["S"] = [];
    }

    n["prototype"]["init"] = function C(e) {
        var t;
        var n;
        var r;
        for (t = 0; t < 256; ++t) this["S"][t] = t;
        for (t = n = 0; t < 256; ++t) {
            n = n + this["S"][t] + e[t % e["length"]] & 255;
            r = this["S"][t];
            this["S"][t] = this["S"][n];
            this["S"][n] = r;
        }
        this["i"] = 0;
        this["j"] = 0;
    };
    n["prototype"]["next"] = function k() {
        var e;
        return this["i"] = this["i"] + 1 & 255, this["j"] = this["j"] + this["S"][this["i"]] & 255, e = this["S"][this["i"]], this["S"][this["i"]] = this["S"][this["j"]], this["S"][this["j"]] = e, this["S"][e + this["S"][this["i"]] & 255];
    };
    var r;
    var o;
    var i;
    var e;
    var s = 256;
    if (null == o) {
        var t;
        o = [];
        i = 0;
        try {
            if (window["crypto"] && window["crypto"]["getRandomValues"]) {
                var a = new Uint32Array(256);
                for (window["crypto"]["getRandomValues"](a), t = 0; t < a["length"]; ++t) o[i++] = 255 & a[t];
            }
        } catch (S) {
        }
        var _ = 0;
    }

    function l() {
        if (null == r) {
            r = function t() {
                return new n();
            }();
            while (i < s) {
                var e = Math["floor"](65536 * Math["random"]());
                o[i++] = 255 & e;
            }
            for (r["init"](o), i = 0; i < o["length"]; ++i) o[i] = 0;
            i = 0;
        }
        return r["next"]();
    }

    function u() {
    }

    u["prototype"]["nextBytes"] = function T(e) {
        var t;
        for (t = 0; t < e["length"]; ++t) e[t] = l();
    };

    function x(e, t, n) {
        if (null != e) {
            "number" == typeof e ? this["fromNumber"](e, t, n) : null == t && "string" != typeof e ? this["fromString"](e, 256) : this["fromString"](e, t);
        }
    }

    function w() {
        return new x(null);
    }

    "Microsoft Internet Explorer" == navigator["appName"] ? e = (x["prototype"]["am"] = function D(e, t, n, r, o, i) {
        var s = 32767 & t;
        var a = t >> 15;
        while (0 <= --i) {
            var _ = 32767 & this[e];
            var c = this[e++] >> 15;
            var l = a * _ + c * s;
            o = ((_ = s * _ + ((32767 & l) << 15) + n[r] + (1073741823 & o)) >>> 30) + (l >>> 15) + a * c + (o >>> 30);
            n[r++] = 1073741823 & _;
        }
        return o;
    }, 30) : "Netscape" != navigator["appName"] ? e = (x["prototype"]["am"] = function A(e, t, n, r, o, i) {
        while (0 <= --i) {
            var s = t * this[e++] + n[r] + o;
            o = Math["floor"](s / 67108864);
            n[r++] = 67108863 & s;
        }
        return o;
    }, 26) : e = (x["prototype"]["am"] = function O(e, t, n, r, o, i) {
        var s = 16383 & t;
        var a = t >> 14;
        while (0 <= --i) {
            var _ = 16383 & this[e];
            var c = this[e++] >> 14;
            var l = a * _ + c * s;
            o = ((_ = s * _ + ((16383 & l) << 14) + n[r] + o) >> 28) + (l >> 14) + a * c;
            n[r++] = 268435455 & _;
        }
        return o;
    }, 28);
    x["prototype"]["DB"] = e;
    x["prototype"]["DM"] = (1 << e) - 1;
    x["prototype"]["DV"] = 1 << e;
    x["prototype"]["FV"] = Math["pow"](2, 52);
    x["prototype"]["F1"] = 52 - e;
    x["prototype"]["F2"] = 2 * e - 52;
    var p;
    var h;
    var f = "0123456789abcdefghijklmnopqrstuvwxyz";
    var d = [];
    for (p = "0"["charCodeAt"](0), h = 0; h <= 9; ++h) d[p++] = h;
    for (p = "a"["charCodeAt"](0), h = 10; h < 36; ++h) d[p++] = h;
    for (p = "A"["charCodeAt"](0), h = 10; h < 36; ++h) d[p++] = h;

    function g(e) {
        return f["charAt"](e);
    }

    function v(e) {
        var t = w();
        return t["fromInt"](e), t;
    }

    function y(e) {
        var t;
        var n = 1;
        return 0 != (t = e >>> 16) && (e = t, n += 16), 0 != (t = e >> 8) && (e = t, n += 8), 0 != (t = e >> 4) && (e = t, n += 4), 0 != (t = e >> 2) && (e = t, n += 2), 0 != (t = e >> 1) && (e = t, n += 1), n;
    }

    function m(e) {
        this["m"] = e;
    }

    function b(e) {
        this["m"] = e;
        this["mp"] = e["invDigit"]();
        this["mpl"] = 32767 & this["mp"];
        this["mph"] = this["mp"] >> 15;
        this["um"] = (1 << e["DB"] - 15) - 1;
        this["mt2"] = 2 * e["t"];
    }

    function E() {
        this["n"] = null;
        this["e"] = 0;
        this["d"] = null;
        this["p"] = null;
        this["q"] = null;
        this["dmp1"] = null;
        this["dmq1"] = null;
        this["coeff"] = null;
        this["setPublic"]("00C1E3934D1614465B33053E7F48EE4EC87B14B95EF88947713D25EECBFF7E74C7977D02DC1D9451F79DD5D1C10C29ACB6A9B4D6FB7D0A0279B6719E1772565F09AF627715919221AEF91899CAE08C0D686D748B20A3603BE2318CA6BC2B59706592A9219D0BF05C9F65023A21D2330807252AE0066D59CEEFA5F2748EA80BAB81", "10001");
    }

    return m["prototype"]["convert"] = function L(e) {
        return e["s"] < 0 || 0 <= e["compareTo"](this["m"]) ? e["mod"](this["m"]) : e;
    }, m["prototype"]["revert"] = function N(e) {
        return e;
    }, m["prototype"]["reduce"] = function R(e) {
        e["divRemTo"](this["m"], null, e);
    }, m["prototype"]["mulTo"] = function j(e, t, n) {
        e["multiplyTo"](t, n);
        this["reduce"](n);
    }, m["prototype"]["sqrTo"] = function B(e, t) {
        e["squareTo"](t);
        this["reduce"](t);
    }, b["prototype"]["convert"] = function M(e) {
        //console.log(e["abs"]()["dlShiftTo"]())
        var t = w();
        return e["abs"]()["dlShiftTo"](this["m"]["t"], t), t["divRemTo"](this["m"], null, t), e["s"] < 0 && 0 < t["compareTo"](x["ZERO"]) && this["m"]["subTo"](t, t), t;
    }, b["prototype"]["revert"] = function P(e) {
        var t = w();
        return e["copyTo"](t), this["reduce"](t), t;
    }, b["prototype"]["reduce"] = function q(e) {
        while (e["t"] <= this["mt2"]) e[e["t"]++] = 0;
        for (var t = 0; t < this["m"]["t"]; ++t) {
            var n = 32767 & e[t];
            var r = n * this["mpl"] + ((n * this["mph"] + (e[t] >> 15) * this["mpl"] & this["um"]) << 15) & e["DM"];
            e[n = t + this["m"]["t"]] += this["m"]["am"](0, r, e, t, 0, this["m"]["t"]);
            while (e[n] >= e["DV"]) {
                e[n] -= e["DV"];
                e[++n]++;
            }
        }
        e["clamp"]();
        e["drShiftTo"](this["m"]["t"], e);
        0 <= e["compareTo"](this["m"]) && e["subTo"](this["m"], e);
    }, b["prototype"]["mulTo"] = function I(e, t, n) {
        e["multiplyTo"](t, n);
        this["reduce"](n);
    }, b["prototype"]["sqrTo"] = function F(e, t) {
        e["squareTo"](t);
        this["reduce"](t);
    }, x["prototype"]["copyTo"] = function z(e) {
        for (var t = this["t"] - 1; 0 <= t; --t) e[t] = this[t];
        e["t"] = this["t"];
        e["s"] = this["s"];
    }, x["prototype"]["fromInt"] = function G(e) {
        this["t"] = 1;
        e < 0 ? this["s"] = -1 : this["s"] = 0;
        0 < e ? this[0] = e : e < -1 ? this[0] = e + this["DV"] : this["t"] = 0;
    }, x["prototype"]["fromString"] = function H(e, t) {
        var n;
        if (16 == t) n = 4; else if (8 == t) n = 3; else if (256 == t) n = 8; else if (2 == t) n = 1; else if (32 == t) n = 5; else {
            if (4 != t) return void this["fromRadix"](e, t);
            n = 2;
        }
        this["t"] = 0;
        this["s"] = 0;
        var r;
        var o;
        var i = e["length"];
        var s = !1;
        var a = 0;
        while (0 <= --i) {
            var _;
            if (8 == n) {
                _ = 255 & e[i];
            } else {
                _ = (r = i, null == (o = d[e["charCodeAt"](r)]) ? -1 : o);
            }
            if (_ < 0) {
                if ("-" == e["charAt"](i)) {
                    s = !0;
                }
            } else {
                s = !1;
                0 == a ? this[this["t"]++] = _ : a + n > this["DB"] ? (this[this["t"] - 1] |= (_ & (1 << this["DB"] - a) - 1) << a, this[this["t"]++] = _ >> this["DB"] - a) : this[this["t"] - 1] |= _ << a;
                (a += n) >= this["DB"] && (a -= this["DB"]);
            }
        }
        8 == n && 0 != (128 & e[0]) && (this["s"] = -1, 0 < a && (this[this["t"] - 1] |= (1 << this["DB"] - a) - 1 << a));
        this["clamp"]();
        s && x["ZERO"]["subTo"](this, this);
    }, x["prototype"]["clamp"] = function X() {
        var e = this["s"] & this["DM"];
        while (0 < this["t"] && this[this["t"] - 1] == e) --this["t"];
    }, x["prototype"]["dlShiftTo"] = function V(e, t) {
        var n;
        for (n = this["t"] - 1; 0 <= n; --n) t[n + e] = this[n];
        for (n = e - 1; 0 <= n; --n) t[n] = 0;
        t["t"] = this["t"] + e;
        t["s"] = this["s"];
    }, x["prototype"]["drShiftTo"] = function U(e, t) {
        for (var n = e; n < this["t"]; ++n) t[n - e] = this[n];
        t["t"] = Math["max"](this["t"] - e, 0);
        t["s"] = this["s"];
    }, x["prototype"]["lShiftTo"] = function $(e, t) {
        var n;
        var r = e % this["DB"];
        var o = this["DB"] - r;
        var i = (1 << o) - 1;
        var s = Math["floor"](e / this["DB"]);
        var a = this["s"] << r & this["DM"];
        for (n = this["t"] - 1; 0 <= n; --n) {
            t[n + s + 1] = this[n] >> o | a;
            a = (this[n] & i) << r;
        }
        for (n = s - 1; 0 <= n; --n) t[n] = 0;
        t[s] = a;
        t["t"] = this["t"] + s + 1;
        t["s"] = this["s"];
        t["clamp"]();
    }, x["prototype"]["rShiftTo"] = function Y(e, t) {
        t["s"] = this["s"];
        var n = Math["floor"](e / this["DB"]);
        if (n >= this["t"]) t["t"] = 0; else {
            var r = e % this["DB"];
            var o = this["DB"] - r;
            var i = (1 << r) - 1;
            t[0] = this[n] >> r;
            for (var s = n + 1; s < this["t"]; ++s) {
                t[s - n - 1] |= (this[s] & i) << o;
                t[s - n] = this[s] >> r;
            }
            0 < r && (t[this["t"] - n - 1] |= (this["s"] & i) << o);
            t["t"] = this["t"] - n;
            t["clamp"]();
        }
    }, x["prototype"]["subTo"] = function W(e, t) {
        var n = 0;
        var r = 0;
        var o = Math["min"](e["t"], this["t"]);
        while (n < o) {
            r += this[n] - e[n];
            t[n++] = r & this["DM"];
            r >>= this["DB"];
        }
        if (e["t"] < this["t"]) {
            r -= e["s"];
            while (n < this["t"]) {
                r += this[n];
                t[n++] = r & this["DM"];
                r >>= this["DB"];
            }
            r += this["s"];
        } else {
            r += this["s"];
            while (n < e["t"]) {
                r -= e[n];
                t[n++] = r & this["DM"];
                r >>= this["DB"];
            }
            r -= e["s"];
        }
        r < 0 ? t["s"] = -1 : t["s"] = 0;
        r < -1 ? t[n++] = this["DV"] + r : 0 < r && (t[n++] = r);
        t["t"] = n;
        t["clamp"]();
    }, x["prototype"]["multiplyTo"] = function J(e, t) {
        var n = this["abs"]();
        var r = e["abs"]();
        var o = n["t"];
        t["t"] = o + r["t"];
        while (0 <= --o) t[o] = 0;
        for (o = 0; o < r["t"]; ++o) t[o + n["t"]] = n["am"](0, r[o], t, o, 0, n["t"]);
        t["s"] = 0;
        t["clamp"]();
        this["s"] != e["s"] && x["ZERO"]["subTo"](t, t);
    }, x["prototype"]["squareTo"] = function K(e) {
        var t = this["abs"]();
        var n = e["t"] = 2 * t["t"];
        while (0 <= --n) e[n] = 0;
        for (n = 0; n < t["t"] - 1; ++n) {
            var r = t["am"](n, t[n], e, 2 * n, 0, 1);
            if ((e[n + t["t"]] += t["am"](n + 1, 2 * t[n], e, 2 * n + 1, r, t["t"] - n - 1)) >= t["DV"]) {
                e[n + t["t"]] -= t["DV"];
                e[n + t["t"] + 1] = 1;
            }
        }
        0 < e["t"] && (e[e["t"] - 1] += t["am"](n, t[n], e, 2 * n, 0, 1));
        e["s"] = 0;
        e["clamp"]();
    }, x["prototype"]["divRemTo"] = function Z(e, t, n) {
        var r = e["abs"]();
        if (!(r["t"] <= 0)) {
            var o = this["abs"]();
            if (o["t"] < r["t"]) return null != t && t["fromInt"](0), void (null != n && this["copyTo"](n));
            if (null == n) {
                n = w();
            }
            var i = w();
            var s = this["s"];
            var a = e["s"];
            var _ = this["DB"] - y(r[r["t"] - 1]);
            if (0 < _) {
                r["lShiftTo"](_, i);
                o["lShiftTo"](_, n);
            } else {
                r["copyTo"](i);
                o["copyTo"](n);
            }
            var c = i["t"];
            var l = i[c - 1];
            if (0 != l) {
                var u = l * (1 << this["F1"]) + (1 < c ? i[c - 2] >> this["F2"] : 0);
                var p = this["FV"] / u;
                var h = (1 << this["F1"]) / u;
                var f = 1 << this["F2"];
                var d = n["t"];
                var g = d - c;
                var v;
                if (null == t) {
                    v = w();
                } else {
                    v = t;
                }
                i["dlShiftTo"](g, v);
                0 <= n["compareTo"](v) && (n[n["t"]++] = 1, n["subTo"](v, n));
                x["ONE"]["dlShiftTo"](c, v);
                v["subTo"](i, i);
                while (i["t"] < c) i[i["t"]++] = 0;
                while (0 <= --g) {
                    var m = n[--d] == l ? this["DM"] : Math["floor"](n[d] * p + (n[d - 1] + f) * h);
                    if ((n[d] += i["am"](0, m, n, g, 0, c)) < m) {
                        i["dlShiftTo"](g, v);
                        n["subTo"](v, n);
                        while (n[d] < --m) n["subTo"](v, n);
                    }
                }
                null != t && (n["drShiftTo"](c, t), s != a && x["ZERO"]["subTo"](t, t));
                n["t"] = c;
                n["clamp"]();
                0 < _ && n["rShiftTo"](_, n);
                s < 0 && x["ZERO"]["subTo"](n, n);
            }
        }
    }, x["prototype"]["invDigit"] = function Q() {
        if (this["t"] < 1) return 0;
        var e = this[0];
        if (0 == (1 & e)) return 0;
        var t = 3 & e;
        return 0 < (t = (t = (t = (t = t * (2 - (15 & e) * t) & 15) * (2 - (255 & e) * t) & 255) * (2 - ((65535 & e) * t & 65535)) & 65535) * (2 - e * t % this["DV"]) % this["DV"]) ? this["DV"] - t : -t;
    }, x["prototype"]["isEven"] = function $_ES() {
        return 0 == (0 < this["t"] ? 1 & this[0] : this["s"]);
    }, x["prototype"]["exp"] = function te(e, t) {
        if (4294967295 < e || e < 1) return x["ONE"];
        var n = w();
        var r = w();
        var o = t["convert"](this);
        var i = y(e) - 1;
        o["copyTo"](n);
        while (0 <= --i) if (t["sqrTo"](n, r), 0 < (e & 1 << i)) t["mulTo"](r, o, n); else {
            var s = n;
            n = r;
            r = s;
        }
        return t["revert"](n);
    }, x["prototype"]["toString"] = function $_Fo(e) {
        if (this["s"] < 0) return "-" + this["negate"]()["toString"](e);
        var t;
        if (16 == e) t = 4; else if (8 == e) t = 3; else if (2 == e) t = 1; else if (32 == e) t = 5; else {
            if (4 != e) return this["toRadix"](e);
            t = 2;
        }
        var n;
        var r = (1 << t) - 1;
        var o = !1;
        var i = "";
        var s = this["t"];
        var a = this["DB"] - s * this["DB"] % t;
        if (0 < s--) {
            if (a < this["DB"] && 0 < (n = this[s] >> a)) {
                o = !0;
                i = g(n);
            }
            while (0 <= s) {
                a < t ? (n = (this[s] & (1 << a) - 1) << t - a, n |= this[--s] >> (a += this["DB"] - t)) : (n = this[s] >> (a -= t) & r, a <= 0 && (a += this["DB"], --s));
                0 < n && (o = !0);
                o && (i += g(n));
            }
        }
        return o ? i : "0";
    }, x["prototype"]["negate"] = function $_Gt() {
        var e = w();
        return x["ZERO"]["subTo"](this, e), e;
    }, x["prototype"]["abs"] = function $_HQ() {
        return this["s"] < 0 ? this["negate"]() : this;
    }, x["prototype"]["compareTo"] = function $_IH(e) {
        var t = this["s"] - e["s"];
        if (0 != t) return t;
        var n = this["t"];
        if (0 != (t = n - e["t"])) return this["s"] < 0 ? -t : t;
        while (0 <= --n) if (0 != (t = this[n] - e[n])) return t;
        return 0;
    }, x["prototype"]["bitLength"] = function $_Jn() {
        return this["t"] <= 0 ? 0 : this["DB"] * (this["t"] - 1) + y(this[this["t"] - 1] ^ this["s"] & this["DM"]);
    }, x["prototype"]["mod"] = function $_BAP(e) {
        var t = w();
        return this["abs"]()["divRemTo"](e, null, t), this["s"] < 0 && 0 < t["compareTo"](x["ZERO"]) && e["subTo"](t, t), t;
    }, x["prototype"]["modPowInt"] = function $_DJs(e, t) {
        var n;
        return e < 256 || t["isEven"]() ? n = new m(t) : n = new b(t), this["exp"](e, n);
    }, x["ZERO"] = v(0), x["ONE"] = v(1), E["prototype"]["doPublic"] = function ce(e) {
        return e["modPowInt"](this["e"], this["n"]);
    }, E["prototype"]["setPublic"] = function le(e, t) {
        if (null != e && null != t && 0 < e["length"] && 0 < t["length"]) {
            this["n"] = function n(e, t) {
                return new x(e, t);
            }(e, 16);
            this["e"] = parseInt(t, 16);
        } else {
            if (console && console["error"]) {
                console["error"]("Invalid RSA public key");
            }
        }
    }, E["prototype"]["encrypt"] = function ue(e) {
        var t = function a(e, t) {
            if (t < e["length"] + 11) return console && console["error"] && console["error"]("Message too long for RSA"), null;
            var n = [];
            var r = e["length"] - 1;
            while (0 <= r && 0 < t) {
                var o = e["charCodeAt"](r--);
                if (o < 128) {
                    n[--t] = o;
                } else {
                    if (127 < o && o < 2048) {
                        n[--t] = 63 & o | 128;
                        n[--t] = o >> 6 | 192;
                    } else {
                        n[--t] = 63 & o | 128;
                        n[--t] = o >> 6 & 63 | 128;
                        n[--t] = o >> 12 | 224;
                    }
                }
            }
            n[--t] = 0;
            var i = new u();
            var s = [];
            while (2 < t) {
                s[0] = 0;
                while (0 == s[0]) i["nextBytes"](s);
                n[--t] = s[0];
            }
            return n[--t] = 2, n[--t] = 0, new x(n);
        }(e, 1024 + 7 >> 3);
        if (null == t) return null;
        var n = this["doPublic"](t);
        if (null == n) return null;
        var r = n["toString"](16);
        return 0 == (1 & r["length"]) ? r : "0" + r;
    }, E;
}();

function e() {
    return (65536 * (1 + Math["random"]()) | 0)["toString"](16)["substring"](1);
}

function te() {
    return e() + e() + e() + e();
};


function $_CCGr(e) {
    window.key = te()
    var t = new X()["encrypt"](key);
    while (!t || 256 !== t["length"]) t = new X()["encrypt"](key);
    return t;
}

function encrypt1(word, key0) {
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
function get_f_w(gt, challenge) {
    var t = this;
    var n = {
        "$_BJBl": 1719031901338,
        "protocol": "https://",
        "gt": gt,
        "challenge": challenge,
        "offline": false,
        "new_captcha": true,
        "product": "float",
        "width": "300px",
        "https": true,
        "api_server": "apiv6.geetest.com",
        "type": "fullpage",
        "static_servers": [
            "static.geetest.com/",
            "static.geevisit.com/"
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
        }
    };
    var e = "-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1"
    t["$_CCF_"] = e;
    t["$_EJK"]["cc"] = n["cc"];
    t["$_EJK"]["ww"] = n["supportWorker"];
    t["$_EJK"]["i"] = e;
    t["$_EJK"]["gt"] = gt;
    t["$_EJK"]["challenge"] = challenge;
    var r = $_CCGr();
    var o = encrypt1(JSON["stringify"](t["$_EJK"]), window.key);
    var i = $_HET(o);
    var s = {
        "gt": gt,
        "challenge": challenge,
        "lang": n["lang"],
        "pt": t["$_BJHm"],
        "client_type": t["$_BJIk"],
        "w": i + r
    };
          return {
        's':s,
        'aesKey':window.key //这里也要返回，之后的加密需要用到，必须保持一致才行
    };
}

//Math.random = function (){return 0.5}
window.$_EJK = {
    "gt": "019924a82c70bb123aae90d483087f94",
    "challenge": "4b538439964403c397e52c4653043893",
    "offline": false,
    "new_captcha": true,
    "product": "float",
    "width": "300px",
    "https": true,
    "api_server": "apiv6.geetest.com",
    "protocol": "https://",
    "type": "fullpage",
    "static_servers": [
        "static.geetest.com/",
        "static.geevisit.com/"
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
    "ww": true,
    "i": "-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1"
}
console.log($_CCGr(e) )

//console.log(get_f_w("019924a82c70bb123aae90d483087f94","2f61b98e0f5a01ae69ed137258ca17e6"))