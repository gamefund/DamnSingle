/**
 * 全局变量保存位置
 */
var userName;
var languageType;
var path;
var uName;
var userId;
var pageState = 0;

/**
 * 主界面加载完毕之后，加载其余界面的js和css
 */
var loadModule = function () {
    for (var i = 0; i < Config.pages.length; i++) {
        try {
            var suffix = new Date().getTime();
            dynamicLoading.css("./module/" + Config.pages[i] + "/css/" + Config.pages[i] + ".css?_=" + suffix);
            dynamicLoading.js("./module/" + Config.pages[i] + "/" + Config.pages[i] + ".html.js?_=" + suffix);
            dynamicLoading.js("./module/" + Config.pages[i] + "/js/" + Config.pages[i] + ".js?_=" + suffix);
        } catch (error) {

        }
    }
};

var nextJson = function (title, msg, bottonNum, bottonMsg, func) {
    if (!isNull(msg)) {
        msg = LText.Success;
    } else {
        msg = LText.False;
    }
    var json = {
        title: title,
        msg: msg,
        bottonNum: bottonNum,
        bottonMsg: bottonMsg,
        func: func,
    }
    return json;
};

/**
 * 操作提示数据封装成json
 * @param title     标题
 * @param msg       提示内容
 * @param bottonNum 按钮数量
 * @param bottonMsg 按钮名
 * @param func
 * @returns {{title: *, msg: *, bottonNum: *, bottonMsg: *, func: *}}
 */
var msgTip = function(title, msg, bottonNum, bottonMsg, func){
    if(!isNull(msg)) {
        msg = LText.Success;
    }
    var json = {
        title: title,
        msg: msg,
        bottonNum: bottonNum,
        bottonMsg: bottonMsg,
        func: func,
    }
    return json;
}

/**
 * 操作提示调用
 * @param title     标题
 * @param msg       提示内容
 * @param bottonNum 按钮数量
 * @param bottonMsg 按钮名
 * @param func
 */
var msgTipFunc = function(title, msg, bottonNum, bottonMsg, func) {
    var text = msgTip(title, msg, bottonNum, bottonMsg, func);
    promptText(text);
    destory();
}

var buttonCountOne = 1;  //按钮数量

/**邮箱格式验证规则*/
var email_rule = /^[A-Za-z\d]+([-_.]*[A-Za-z\d]+)*@([A-Za-z\d]+[-.]){1,3}[A-Za-z\d]{2,5}$/;
var pwd_rule = /^[a-zA-Z0-9]{6,12}/;
