/**
 * 登入界面
 */
var signInInit = function () {
    fadeInOutLoad(SignInPageLoad, null);
}

/**
 * 登入页面初始加载内容
 */
var SignInPageLoad = function (params) {
    // var obj = {"page":"signInInit","kitty_id":null,"kitty_type":null};
    var obj = {
        "page": "signInInit",
        "paramJson": params
    };
    leftToRightArray.push(obj);
    headerInit();
    showSignHeaderLine(); //导航栏的选中登录显示下划线
    $("#all-container").append(signInText);
    $(".sign-in-container").append(loginText);
    $(" .login-button").click(function () {
        checkLoginParams();
    });

    loginPageClick();

}

var loginPageClick = function() {
        //登陆标签
    $(".title-login .login-tab").click(function () {
        if ($(this).hasClass("login-tab-selected")) {
            return;
        }
        $(this).addClass('login-tab-selected');
        $(".register-content").remove();
        $(".sign-in-container").append(loginText);
        $(" .login-button").click(function () {
            checkLoginParams();
        });
        $(".title-register .register-tab").removeClass('register-tab-selected');
    });
    //注册标签
    $(".title-register .register-tab").click(function () {
        if ($(this).hasClass("register-tab-selected")) {
            return;
        }
        $(this).addClass('register-tab-selected');
        $(".login-content").remove();
        $(".sign-in-container").append(registerText);
        $(".register-button").click(function () {
            // checkRegisterParams();
            checkInvitationRegisterParams();
        });
        $(".title-login .login-tab").removeClass('login-tab-selected');
        detailClick();
        
    });
}

/**
 * 用户登录
 */
var userLogin = function (email, pwd) {
    $.ajax({
        url: Config.address + "userLogin",
        type: "POST",
        data: {
            "email": email,
            "password": pwd,
        },
        success: function (response) {
            console.info(response);
            switch (response.msg.state) {
                case msgCode[0]: //成功
                    userId = response.msg.userInfo.id;
                    localStorage.setItem("userId", userId);
                    jumpToPage(userId);
                    break;
                case msgCode[1]: //账号错误或不存在
                    msgTipFunc(LText.Title, signInLangu.UserNotExist, buttonCountOne, [LText.Ok], [OK]);
                    break;
                case msgCode[2]: //参数不完整
                    msgTipFunc(LText.Title, signInLangu.IncompleteTip, buttonCountOne, [LText.Ok], [OK]);
                    break;
                default: //登录失败
                    msgTipFunc(LText.Title, signInLangu.LoginFail, buttonCountOne, [LText.Ok], [OK]);
            }
        },
        error: function (error) {
            msgTipFunc(LText.Title, LText.False, buttonCountOne, [LText.Ok], [OK]);
        }
    });
};

/**
 *  验证登录参数
 */
var checkLoginParams = function () {
    // var address = $(".login-address-input input").val();
    // if (!isNull(address)) {
    //     msgTipFunc(LText.Title, signInLangu.IncompleteTip, buttonCountOne, [LText.Ok], [OK]);
    //     return;
    // }
    // userLogin(address);
    var email = $(".login-email-input input").val();
    var pwd = $(".login-password-input input").val();
    if (!email_rule.test(email)) {
        msgTipFunc(LText.Title, signInLangu.EmailTip, buttonCountOne, [LText.Ok], [OK]);
        return;
    }
    if (!isNull(pwd)) {
        msgTipFunc(LText.Title, signInLangu.IncompleteTip, buttonCountOne, [LText.Ok], [OK]);
        return;
    }
    userLogin(email, hex_md5(pwd));
}

/**
 * 用户注册
 */
var userRegister = function (address, email, nickname, pwd, invite) {
    //TODO 加入模式化界面显示
    $.ajax({
        url: Config.address + "userRegister",
        type: "POST",
        data: {
            "email": email,
            "nickname": nickname,
            "password": pwd,
            "invitationcode": invite,
        },
        success: function (response) {
            //TODO 隐藏模式化界面显示
            console.info(response.msg);
            switch (response.msg.state) {
                case msgCode[0]: //成功
                    userId = response.msg.userId;
                    localStorage.setItem("userId", userId);
                    jumpToPage(userId);
                    break;
                case msgCode[2]: //参数不完整
                    msgTipFunc(LText.Title, signInLangu.IncompleteTip, buttonCountOne, [LText.Ok], [OK]);
                    break;
                case msgCode[3]: //账号已经存在
                    msgTipFunc(LText.Title, signInLangu.UserExist, buttonCountOne, [LText.Ok], [OK]);
                    break;
                default: //注册失败
                    msgTipFunc(LText.Title, signInLangu.RegisterFailure, buttonCountOne, [LText.Ok], [OK]);
            }
        },
        error: function (error) {
            //TODO 隐藏模式化界面显示
            msgTipFunc(LText.Title, LText.False, buttonCountOne, [LText.Ok], [OK]);
        }
    });
}

/**
 *  验证注册参数
 */
var checkRegisterParams = function () {
    var address = $(".register-address-input input").val();
    var email = $(".register-email-input input").val();
    var nickname = $(".register-nickname-input input").val();
    if (!isNull(address) || !isNull(email) || !isNull(nickname)) { //输入参数不完全
        msgTipFunc(LText.Title, signInLangu.IncompleteTip, buttonCountOne, [LText.Ok], [OK]);
        return;
    }
    if (!email_rule.test($(".register-email-input input").val())) { //邮箱地址不正确
        msgTipFunc(LText.Title, signInLangu.EmailTip, buttonCountOne, [LText.Ok], [OK]);
        return;
    }
    userRegister(address, email, nickname);
}

/**
 * 验证邀请码注册的参数
 */
var checkInvitationRegisterParams = function () {
    $("body").animate({scrollTop:0}, 200);  //将页面回到顶端
    var email = $(".register-email-input input").val();
    var nickname = $(".register-nickname-input input").val();
    var pwd = $(".register-pwd-input input").val();
    var rePwd = $(".register-pwd-re-input input").val();
    var invite = $(".register-invitation-input input").val();
    if (!isNull(email) || !isNull(nickname) || !isNull(pwd) ||
        !isNull(rePwd) || !isNull(invite)) { //输入参数不完全
        msgTipFunc(LText.Title, signInLangu.IncompleteTip, buttonCountOne, [LText.Ok], [OK]);
        return;
    }
    if (!email_rule.test($(".register-email-input input").val())) { //邮箱地址不正确
        msgTipFunc(LText.Title, signInLangu.EmailTip, buttonCountOne, [LText.Ok], [OK]);
        return;
    }
    if (!checkPwd(pwd, rePwd)) {    //检测密码
        msgTipFunc(LText.Title, signInLangu.PwdTip, buttonCountOne, [LText.Ok], [OK]);
        return;
    }
    if (!isNull(invite)) {    //检测邀请码
        msgTipFunc(LText.Title, signInLangu.InviteTip, buttonCountOne, [LText.Ok], [OK]);
        return;
    }
    userRegister("", email, nickname, hex_md5(pwd), invite);
};


/**
 * 登录、注册后跳转
 */
var jumpToPage = function (data) {
    var urlStr = window.location.href;
    var index = urlStr.indexOf("code=");
    leftToRightArray.pop();
    if (isNull(leftToRightArray[leftToRightArray.length - 1]) || index != -1) {
        if(index != -1) {
            var params = {
                    "kittyOwnerId": data,
                };
            myKittyInit(params);
        }
        switch (leftToRightArray[leftToRightArray.length - 1].page) {
            case "kittyInit":
            case "myKittyInit":
                var func = eval(leftToRightArray[leftToRightArray.length - 1].page);
                var paramJson = leftToRightArray[leftToRightArray.length - 1].paramJson;
                new func(paramJson);
                leftToRightArray.pop();
                break;
            default:
                var params = {
                    "kittyOwnerId": null,
                };
                myKittyInit(params);
        }
    }
};

/**检测输入的密码*/
var checkPwd = function (pwd, rePwd) {
    if (!pwd_rule.test(pwd) || !pwd_rule.test(rePwd)) {
        return false;
    }
    if (pwd !== rePwd) {
        return false;
    }
    return true;
};

// 点击邀请详情
var detailClick = function() {
    $('.register-invitation-detail').bind("click", function() {
        console.log("1234564");
        $('.code-detail-background').css("display", "block");
        detaILMsg();
    });

    $('.code-detail-background').click(function() {
        $(".code-detail-background").attr("style","display:none;");
    });

    $(".detail-close1-icon").click(function(){
        $(".code-detail-background").attr("style","display:none;")
    });
}

var detaILMsg = function() {
    $("#gtop_half_title").html(LText.gtop_half_title);//邀请码提示框内容===中文
    $("#gtop_half_text1").html(LText.gtop_half_text1);
    $("#gtop_half_text2").html(LText.gtop_half_text2);
    $("#gtop_half_text3").html(LText.gtop_half_text3);
    $("#gbottom_half_title").html(LText.gbottom_half_title);
    $("#bottom-half-text-ul-p1").html(LText.gbottom_half_text_ul_p1);
    $("#bottom-half-text-ul-p2").html(LText.gbottom_half_text_ul_p2);;
}