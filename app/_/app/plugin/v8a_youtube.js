v8a.plugin("youtube", function (id, callback) {
    v8a.plugin("cors")("https://m.youtube.com/watch?v=" + id, function (r) {
        if (r) {
            r = r.substring(r.indexOf('url_encoded_fmt_stream_map'), r.length);
            r = r.substring(r.indexOf('url=http') + 4, r.length);
            r = r.split('url=')[0];
            r = decodeURIComponent(r.substring(0, r.indexOf('\\\\')));
            (callback || function (r) {
                var a = document.getElementById("video-" + id);
                a.src = r;
                a.load();
                a.onerror = function () {
                    var b = document.createElement("iframe");
                    b.setAttribute("width", "100%");
                    b.setAttribute("height", "100%");
                    b.src = "https://www.youtube.com/embed/" + id;
                    b.setAttribute("frameborder", "0");                    
                    a.parentNode.replaceChild(b, a)
                };
            })(r);
        }
    });
    return '<video style="width:100%" poster="https://i1.ytimg.com/vi/' + id + '/maxresdefault.jpg" id="video-' + id + '" controls></video>';
});