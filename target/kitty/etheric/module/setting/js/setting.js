var settingInit = function(){
    fadeInOutLoad(settingPageLoad,null);
}

var settingPageLoad = function(){
    var obj = {"page":"settingInit","paramJson":null};
    leftToRightArray.push(obj);
    headerInit();
    removeHeaderLine();//移除header的导航栏选中下划线

    $("#all-container").append(settingText);
    findUserInfo();

    $(".setting-img img").on("click",function(){
        $(".setting-img img").css("transition", "0.5s");
        $(".setting-img img").css("transform", "scale(0.95)");
        $(".setting-img img").css("opacity", "0.8");
        setTimeout(function () {
            switchImage();
            $(".setting-img img").css("transition", "0.5s");
            $(".setting-img img").css("transform", "scale(1)");
            $(".setting-img img").css("opacity", "1");
        }, 400);
    });

    $(".setting-button").on("click",function(){
        var address = $(".setting-address-input input").val();
        var email = $(".setting-email-input input").val();
        var nickname = $(".setting-nickname-input input").val();
        checkUserInfo(address,email,nickname);
    });
}

var imageIndex = 1;     //头像图片索引

/**
 * 切换头像图片
 */
var switchImage = function(){
    if(imageIndex<userImageCount){
        imageIndex++;
        $(".setting-img img").attr("src","./module/profile/"+imageIndex+".png");
    }else{
        imageIndex = 1;
        $(".setting-img img").attr("src","./module/profile/"+imageIndex+".png");
    }
}

/**
 * 查询用户资料信息
 */
var findUserInfo = function(){
    var uId = localStorage.getItem("userId");
    $.ajax({
        url: Config.address + "getUserInfo",
        data: {
            userId : uId,
        },
        type: "POST",
        success: function(data){
            console.log(data.msg);
            showUserInfo(data.msg);
        },
        error: function(xhr){
            msgTipFunc(LText.Title, LText.False, 1, [LText.Ok], [OK]);
        }
    });
}

/**
 * 显示用户资料信息
 * @param data
 */
var showUserInfo = function(data){
    imageIndex = data.image;
    $(".setting-img img").attr("src","./module/profile/"+data.image+".png");
    $(".setting-address-input input").val(data.address);
    $(".setting-email-input input").val(data.email);
    $(".setting-nickname-input input").val(data.nickname);
}

/**
 * 验证用户信息
 * @param address
 * @param email
 * @param nickname
 */
var checkUserInfo = function(address,email,nickname){
    if(!isNull(address) || !isNull(email) || !isNull(nickname)){
        msgTipFunc(LText.Title, signInLangu.IncompleteTip, 1, [LText.Ok], [OK]);
        return;
    }
    submitUserInfo(address,email,nickname);
}

/**
 * 提交账户信息
 * @param address
 * @param email
 * @param nickname
 */
var submitUserInfo = function(address,email,nickname){
    var uId = localStorage.getItem("userId");
    $.ajax({
        url: Config.address + "userInfoSetting",
        data: {
            userId : uId,
            image : imageIndex,
            email : email,
            nickname : nickname,
        },
        type: "POST",
        success: function(data){
            switch(data.msg.state){
                case msgCode[0] :
                    jumpToPage();
                    break;
                case msgCode[2] :
                    msgTipFunc(LText.Title, LText.IncompleteParams, 1, [LText.Ok], [OK]);
                    break;
                default :
                    msgTipFunc(LText.Title, LText.False, 1, [LText.Ok], [OK]);
            }
        },
        error: function(xhr){
            msgTipFunc(LText.Title, LText.False, 1, [LText.Ok], [OK]);
        }
    });
}