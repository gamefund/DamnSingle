var languageController = function () {
    switch (localStorage.getItem(HTML_LANGUAGE)) {
        case "zh":
            $.getScript("./module/language/zh-ch.js").done(loadModule);
            $("body").lang = "zh";
            break;
        case "en":
            $.getScript("./module/language/en-us.js").done(loadModule);
            $("body").lang = "en";
            break;
        default:
            $.getScript("./module/language/en-us.js").done(loadModule);
            $("body").lang = "en";
            break;
    }
};

window.onload = function () {
    //缓存的用户id获取
    userId = localStorage.getItem("userId");
    //优先触发语言模块
    languageController();
};

/**
 * 所有页面淡入淡出
 */
var fadeInOutLoad = function (pageLoadFun, params) {
    $("body").css("transition", "0.5s");
    $("body").css("transform", "scale(0.9)");
    $("body").css("opacity", "0.6");
    setTimeout(function () {
        $("#all-container").empty();
        $("body").css("transition", "0.5s");
        $("body").css("transform", "scale(1)");
        $("body").css("opacity", "1");
        pageLoadFun(params);
    }, 400);
};