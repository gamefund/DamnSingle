/**
 * 变量是否为空
 * 为空返回 false, 不为空返回true
 */
var isNull = function (data) {
    if (data == null || data == undefined || data == "") {
        return false;
    }
    return true;
};

// 动态加载静态文件
var dynamicLoading = {
    css: function (path) {
        if (!path || path.length == 0) {
            throw new Error("没有找到该css文件:\n" + path);
        }
        var head = document.getElementsByTagName('head')[0];
        var link = document.createElement('link');
        link.href = path;
        link.rel = 'stylesheet';
        link.type = 'text/css';
        head.appendChild(link);
    },
    js: function (path) {
        if (!path || path.length == 0) {
            throw new Error("没有找到该js文件:\n" + path);
        }
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.src = path;
        script.type = 'text/javascript';
        script.charset = 'utf-8';
        head.appendChild(script);
    }
};