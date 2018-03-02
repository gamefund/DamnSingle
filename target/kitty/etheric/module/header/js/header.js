/**
 * kitties header
 */
var headerInit = function () {
    $("#all-container").append(headerText);
    if (leftToRightArray.length > 1) {
        $(".kitties-logo").before(headerReturnText);
    }
    floatWindowInit();
    $("#all-container").bind("click", function() {
        clickMusic(this);
    });

    //点击logo返回主页
    $(".kitties-logo").hover(function () {
        $(".kitties-logo-img").addClass("kitties-logo-img-hover").removeClass("kitties-logo-img");
    }, function () {
        $(".kitties-logo-img-hover").removeClass("kitties-logo-img-hover").addClass("kitties-logo-img");
    })
    //根据屏幕修改logo大小
    if ($(window).width() > 480) {
        $(".kitties-logo-img").css({
            'width': '4rem'
        }, {
            'height': '5.3rem'
        });
        $(".kitties-logo-img-hover").css({
            'width': '4rem'
        }, {
            'height': '5.3rem'
        });
    } else {
        $(".kitties-logo-img").css({
            'width': '3rem',
            'height': '4rem'
        });
        $(".kitties-logo-img-hover").css({
            'width': '3rem',
            'height': '4rem'
        });
    }
    
    /**
     * sign in显示控制
     */
    if (userId == null) {
        $(".kitties-sign-in").html(LText.SignIn);
    } else {
        $(".kitties-sign-in").html(LText.MyKitties);
    }


    //导航栏的选中下划线显示变化
    $(".kitties-sign-in").click(function () {
        if ($(this).hasClass("kitty-header-selected")) {
            return;
        }
        $(this).addClass("kitty-header-selected").siblings().removeClass("kitty-header-selected");
        //启动我的猫界面
        if (userId == null) {
            $(".kitties-sign-in").html(LText.SignIn);
            signInInit();
        } else {
            $(".kitties-sign-in").html(LText.MyKitties);
            var params = {
                "kittyOwnerId": null,
            };
            myKittyInit(params);
        }
    });

    /**
     * 点击logo
     */
    $(".kitties-logo").click(function () {
        leftToRightArray.splice(0, leftToRightArray.length);
        rightToLeftArray.splice(0, rightToLeftArray.length);
        homePageInit();
    });

    $(".kitties-marketplace").bind("click", function () {
        if ($(this).hasClass("kitty-header-selected")) {
            return;
        }
        $(this).addClass("kitty-header-selected").siblings().removeClass("kitty-header-selected");
        leftToRightArray.splice(0, leftToRightArray.length);
        rightToLeftArray.splice(0, rightToLeftArray.length);
        marketInit();
    });

    //返回按钮
    $(".header-return").click(function () {
        leftToRightArray.pop();
        var func = eval(leftToRightArray[leftToRightArray.length - 1].page);
        var paramJson = leftToRightArray[leftToRightArray.length - 1].paramJson;
        new func(paramJson);
        leftToRightArray.pop();
    });
    if (uName != undefined) {
        $(".kitties-sign-in").html(uName);
    }
    choseLanguage();
    $('.kitties-out-next').bind("click", function () {
        var flag = "";
        try {
            flag = $(this).attr("id");
        } catch (e) {

        }
        if (isNull(flag) && flag == "true") {
            $('.out-select-main').show();
            $(this).attr("id", "false");
        } else if (isNull(flag) && flag == "false") {
            $('.out-select-main').hide();
            $(this).attr("id", "true");
        }
        if ($(this).hasClass("kitty-header-selected")) {
            return;
        }
        $(this).addClass("kitty-header-selected").siblings().removeClass("kitty-header-selected");
        $('.kitties-head').append(outSelect);
        choseLanguage();
        activeClick();
    });

}
/**
 * 活动按钮点击事件
 */
var activeClick = function () {
    $(".out-active").click(function () {
        if (isNull(userId)) {
            waitModel();
            $('.out-select-main').remove();
            activeInit();
        } else {
            signInInit();
        }
    });
}

var choseLanguage = function () {
    // var select =  $(".kitties-language-select");
    $(".kitties-language-select").on("change", function () {
        switch ($(this).val()) {
            case "zh":
                localStorage.setItem(HTML_LANGUAGE, "zh");
                break;
            case "en":
                localStorage.setItem(HTML_LANGUAGE, "en");
                break;
        }
        window.location.href = window.location.href;
    });

    switch (localStorage.getItem(HTML_LANGUAGE)) {
        case "zh":
            document.getElementsByClassName("kitties-language-select")[0][0].selected = true;
            if (isNull(document.getElementsByClassName("kitties-language-select")[1])) {
                document.getElementsByClassName("kitties-language-select")[1][0].selected = true;
            }
            break;
        case "en":
            document.getElementsByClassName("kitties-language-select")[0][1].selected = true;
            if (isNull(document.getElementsByClassName("kitties-language-select")[1])) {
                document.getElementsByClassName("kitties-language-select")[1][1].selected = true;
            }
            break;
        default:
            document.getElementsByClassName("kitties-language-select")[0][1].selected = true;
            if (isNull(document.getElementsByClassName("kitties-language-select")[1])) {
                document.getElementsByClassName("kitties-language-select")[1][1].selected = true;
            }
            break;
    }
}

//删除头部的选中下划线
var removeHeaderLine = function () {
    $(".kitties-sign-in").removeClass("kitty-header-selected");
    $(".kitties-marketplace").removeClass("kitty-header-selected");
}
//导航栏的选中登录显示下划线
var showSignHeaderLine = function () {
    $(".kitties-sign-in").addClass("kitty-header-selected").siblings().removeClass("kitty-header-selected");
}
//导航栏的选中market显示下划线
var showMarketHeaderLine = function () {
    $(".kitties-marketplace").addClass("kitty-header-selected").siblings().removeClass("kitty-header-selected");
}

/**
 * 滑动返回（左、右）
 */
// var windowHeight = $(window).height(),
// $body = $("body");
// $body.css("height", windowHeight);
$("#all-container").on("touchstart", function (e) {
    // e.preventDefault();
    startX = e.originalEvent.changedTouches[0].pageX,
        startY = e.originalEvent.changedTouches[0].pageY;
});
$("#all-container").on("touchmove", function (e) {
    // e.preventDefault();
    // e.stopPropagation();
    moveEndX = e.originalEvent.changedTouches[0].pageX,
        moveEndY = e.originalEvent.changedTouches[0].pageY,
        X = moveEndX - startX,
        Y = moveEndY - startY;

    if (Math.abs(X) > Math.abs(Y) && X > window.screen.width / 4) {
        if (leftToRightArray.length > 1) {
            rightToLeftArray.push(leftToRightArray[leftToRightArray.length - 1]);
            leftToRightArray.pop();
            var func = eval(leftToRightArray[leftToRightArray.length - 1].page);
            var paramJson = leftToRightArray[leftToRightArray.length - 1].paramJson;
            new func(paramJson);
            leftToRightArray.pop();
        }
    } else if (Math.abs(X) > Math.abs(Y) && X < -window.screen.width / 4) {
        if (rightToLeftArray.length > 0) {
            leftToRightArray.push(rightToLeftArray[rightToLeftArray.length - 1]);
            var func = eval(rightToLeftArray[rightToLeftArray.length - 1].page);
            var paramJson = rightToLeftArray[rightToLeftArray.length - 1].paramJson;
            new func(paramJson);
            leftToRightArray.pop();
            rightToLeftArray.pop();
        }
    }
});