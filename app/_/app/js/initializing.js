var j1Lib_defer = function (e, n) {
    var t = function (e, n, t, r) { var i = document.createElement(e); return i[n] = t, i.onload = i.onreadystatechange = function () { r() }, document.body.appendChild(i), i };
    if (e.length) {
        var r = e.shift();
        r.match("js$") == "js" ? t("script", "src", r, function () { j1Lib_defer(e, n) }) : t("link", "href", r, function () { j1Lib_defer(e, n) }).rel = "stylesheet"
    } else n()
};
var j1Lib_ajax = function (n, t, e, m) {
    var r = new XMLHttpRequest;
    return r.open(m || "GET", n), r.addEventListener("load", function () {
        200 == r.status ? t(r) : e(r)
    }), r.addEventListener("error", function () {
        e(r)
    }), r
};

var v8a = {
    _: {
        css: [],
        js: [],
        plugin: {},
        domain: []
    },
    fn: function (e) {
        if (e) {
            return v8a.fn()[e] || "這個版本不支援" + e + "功能";
        } else {
            return v8a["1.0.0"];
        }
    },
    plugin: function (name, fn) {
        if (fn) {
            if (!v8a._.plugin[name]) {
                v8a._.plugin[name] = fn;
            } else {
                return "插件共用識別名稱" + name;
            }
        } else {
            return v8a._.plugin[name];
        }
    },
    "1.0.0": {
        "@import": function (file, callback) {
            if (typeof file == typeof []) {
                var b = [];
                file.forEach(function (a) {
                    var c = v8a._[a.substring(a.lastIndexOf(".") + 1)];
                    if (!c.indexOf(a) + 1) {
                        b.push(a);
                        c.push(a);
                    }
                });
                j1Lib_defer(b, callback || function () { });
            } else {
                if (typeof callback == typeof "") {
                    var a = [].slice.call(arguments);
                    if (typeof a[a.length - 1] == typeof "") {
                        v8a["1.0.0"]["@import"](a);
                    } else {
                        var b = a.pop();
                        v8a["1.0.0"]["@import"](a, b);
                    }
                } else {
                    v8a["1.0.0"]["@import"]([file], callback);
                }
            }
        },
        "@view": function (name) {
            j1Lib_ajax("www/" + name + ".html", function (a) {
                document.body.innerHTML = a.response.replace(/{{@(.*) (.*)}}/g, function (a, b, c) {
                    return (v8a._.plugin[b] || function () { })(c);
                });
                [].slice.call(document.body.getElementsByTagName("script")).forEach(function (i) {
                    if (i.getAttribute("src")) {
                        j1Lib_defer([i.getAttribute("src")], function () { });
                    } else {
                        eval(i.innerHTML);
                    }
                });
            }, function () {
                console.log("error");
            }).send();
        },
        "@plugin": function (name) {
            return v8a.plugin(name);
        }
    }
};

for (var a = 0; a < document.styleSheets.length; a++) {
    v8a._.css.push(document.styleSheets[a].ownerNode.getAttribute("href"));
}
for (var a = 0; a < document.scripts.length; a++) {
    v8a._.js.push(document.scripts[a].getAttribute("src"));
}

var app = v8a.fn;

v8a.fn("@import")(["app/js/network-domain.js", "app/js/plugin.js"], function () {
    v8a._.domain = domain;
    domain = undefined;
    (function (x) {
        window.XMLHttpRequest.prototype.open = function (a, b) {
            if (b.match("^www/") == "www/" || v8a._.domain.indexOf("*") + 1 || v8a._.domain.indexOf(new URL(b).hostname) + 1) {
                x.apply(this, arguments);
            } else {
                x.apply(this, [a, null]);
            }
        };
    })(window.XMLHttpRequest.prototype.open);
    v8a.fn("@import")(plugin.map(function (a) {
        return "app/plugin/" + a + ".js";
    }), function () {
        plugin = undefined;
        app("@view")("index");
    });
});