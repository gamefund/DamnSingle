/**
 * 加载用
 * @param {*} content
 */
var waitModel = function (content) {
    $("body").append(waitAlertText);
    $("#wait_alert .alert-icon").addClass("wait-icon"); // 添加旋转的背景图
    $("#wait_alert .alert-tip").append('<span class="alert-point">...</span>'); // 添加三个点
    $("#wait_alert").css("z-index", 116);
    pointLoading(); // 三个点依次闪动
    $(".alert-tip-value").text(content);
};

/**
 * 成功用
 * @param {*} content
 * @param {*} callback
 */
var successModel = function (content, callback) {
    $("body").append(waitAlertText);
    $("#wait_alert .alert-icon").addClass("success-icon"); // 添加旋转的背景图
    $("#wait_alert").css("z-index", 116);
    $(".alert-tip-value").text(content);
    setTimeout(function () {
        destory();
        if (callback) callback();
    }, 2000);
};

/**
 * 失败用
 * @param {*} content
 * @param {*} callback
 */
var failModel = function (content, callback) {
    $("body").append(waitAlertText);
    $("#wait_alert .alert-icon").addClass("fail-icon"); // 添加旋转的背景图
    $("#wait_alert").css("z-index", 116);
    $(".alert-tip-value").text(content);
    setTimeout(function () {
        destory();
        if (callback) callback();
    }, 2000);
};

// 析构
var destory = function () {
    // clearInterval(loading);
    $("#wait_alert").remove();
};

/**
 * ., .., ... 循环动
 */
var loading = "";
var pointLoading = function () {
    var count = 0;
    this.alertPoint = $(".alert-point");
    if (this.alertPoint.length === 1) {
        loading = setInterval(function () {
            if (count === 0) {
                this.alertPoint.text(".");
            } else if (count === 1) {
                this.alertPoint.text("..");
            } else if (count === 2) {
                this.alertPoint.text("...");
            } else if (count === 3) {
                this.alertPoint.text("...");
            }
            if (count === 3) {
                count = 0;
            } else {
                count++;
            }
        }, 500);
    }
};

/**
 * 获取模式化窗口是否已经被添加
 * @returns {boolean}
 */
var alertHasShow = function () {
    if ($("#wait_alert").length <= 0) {
        return false;
    }
    return true;
}