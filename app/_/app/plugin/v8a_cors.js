v8a.plugin("cors", function (url, callback) {
    j1Lib_ajax(url, function (a) {
        callback(a.response);
    }, function () {
        j1Lib_ajax("https://dry-sierra-94326.herokuapp.com/"+url, function (a) {
            callback(a.response);
        }, function () {
            callback();
        }).send();
    }).send();
});