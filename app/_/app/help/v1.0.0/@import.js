v8a.fn("@import")("app/css/normalize.css", function () {
    console.log("done");
});

v8a.fn("@import")(["app/css/normalize.css", "app/css/normalize.css"], function () {
    console.log("done");
});

v8a.fn("@import")("app/css/normalize.css", "app/css/normalize.css", "app/css/normalize.css", function () {
    console.log("done");
});