/**
 *  kitty主页
 */
var homePageInit = function () {
    fadeInOutLoad(homePageLoad, null);
}

var homePageLoad = function (params) {

    headerInit();
    removeHeaderLine();

    //判断是邀请码还是主动进入
    if($('#all-container').hasClass("all-container-type") && !isNull(userId)) {
        $("#all-container").append(signInText);
        $(".sign-in-container").append(registerText);
        $(".title-login .login-tab").removeClass('login-tab-selected');
        $(".title-register .register-tab").addClass('register-tab-selected');
        $(".register-button").click(function(){
            checkInvitationRegisterParams();
        });
        loginPageClick();
        detailClick();
        var code = urlCompare();
        $('#register-text').val(code);
        return;
    }

    
    var obj = {
        "page": "homePageInit",
        "paramJson": null
    };
    leftToRightArray.push(obj);
    $("#all-container").append(homePageText);
    //start woof点击事件
    $(".start-btn").click(function () {
        if (userId == null) {
            signInInit();
        } else {
            var params = {
                "kittyOwnerId": null,
            };
            myKittyInit(params);
        }
    });
};

//打开主页
if (pageState == 0) {
    homePageInit();
}

//有邀请码进入到注册页面时， 将注册码从url中提取出来
var urlCompare = function() {
    var searchStr = location.search.substr(1);
    var compares = searchStr.split("&");
    var compare = compares[0].split("=");
    return compare[1];
}