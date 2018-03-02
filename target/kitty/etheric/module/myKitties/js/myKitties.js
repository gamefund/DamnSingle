﻿/**
 * 我的猫
 */
var myKittyInit = function (params) {
    fadeInOutLoad(myKittyPageLoad, params);
}

/**
 * 当前页面全局变量管理
 */
var myKitty_ownerId;

/**
 *  我的猫页面初始加载内容
 */
var myKittyPageLoad = function (params) {
    // var kitty_id = params.kitty_id;
    var kittyOwnerId = params.kittyOwnerId;
    // var obj = {"page":"myKittyInit","kitty_id":kitty_id};
    var obj = {
        "page": "myKittyInit",
        "paramJson": params
    };
    leftToRightArray.push(obj);
    headerInit();

    myKitty_ownerId = kittyOwnerId;
    $("#all-container").append(myKittyText);
    if (isNull(userId)) {
        if (!isNull(kittyOwnerId)) {    //进入别人的猫界面
            $('.loginOut').show();
            $(".setting-a").show();
            $(".invite-friend").show();            
        } else if (userId == kittyOwnerId) {    //进入的是我的猫界面
            $(".invite-friend").show();
            $('.loginOut').show();
            $(".setting-a").hide();
        }
    }
    getUserInfo(kittyOwnerId);
    fastCheck();
    waitModel();
    clickHeaderImage(1)
}

/**
 *  查询当前用户信息
 */
var getUserInfo = function (kittyOwnerId) {
    var uid = userId;
    if (kittyOwnerId != null) {
        uid = kittyOwnerId;
    }
    if (userId == kittyOwnerId || kittyOwnerId == null) {
        showSignHeaderLine() //显示signIn/myKitties的下划线
    } else {
        removeHeaderLine(); //移除header的导航栏选中下划线
    }
    $.ajax({
        url: Config.address + "getUserInfo",
        type: "POST",
        data: {
            "userId": uid,
        },
        success: function (response) {
            console.info(response.msg);
            fillInUserInfo(response.msg);
        },
        error: function (error) {
            var text = nextJson(LText.Title, titleText(LText.SystemTitle), 1, [LText.Ok], [OK]);
            promptText(text);
            destory();
        }
    });
};

var fillInUserInfo = function (data) {
    if (data.nickname == null) {
        $('.owner-name').html("" + LText.Owner + " #" + userId);
    } else {
        $('.owner-name').html(data.nickname);
    }
    $('.owner-headImage').css("backgroundImage", "url(./module/profile/1.png)");
    $('.owner-address').html(data.address);
    if (isNull(data.address)) {
        $('.owner-address').html(data.address);
    } else {    //地址为空，则隐藏该dom元素
        $('.owner-address').hide();
    }
}

/**
 * 点击事件
 */
var fastCheck = function () {
    //点击筛选按钮
    $(".filter-kitties-down").click(function () {
        console.log("111")

        $(".self-filterArea-background").show();
        $(".all-kitties-message").css("position", "fixed");
        //点击其他区域关闭筛选弹出层
        $(document).unbind("click").bind("click", function (event1) {
            if ($(event1.target).hasClass("self-filterArea-background")) {
                $(".self-filterArea-background").hide();
                $(".all-kitties-message").css("position", "absolute");
                $(".self-filter-item").removeClass("filter-item-addclass");
            }
        })
        //点击进行不同类型筛选
        $(".self-filter-item").unbind("click").bind("click", function(){
            if($(this).hasClass("filter-item-addclass")){
                $(this).removeClass("filter-item-addclass");
                waitModel();
                clickHeaderImage(1);
                return;
            }
            $(this).addClass('filter-item-addclass').siblings().removeClass('filter-item-addclass');
            waitModel();
            clickHeaderImage(1);
        });
    });

    //下拉框排序按钮绑定事件
    $('.kitties-column-down').bind("change", function () {
        waitModel();
        clickHeaderImage(1);
    });

    //分页按钮
    $('#chose-page-button .active').click(function () {
        var index = $('#chose-page-button .active').html();
        waitModel();
        clickHeaderImage(index);
    });

    //代数筛选
    $('.mykitty-gen-toSearch').bind("click", function () {
        waitModel();
        clickHeaderImage(1);
    });

    //代数筛选清除
    $('.mykitty-gen-toCancle').bind("click", function () {
        $("#13").val("");
        waitModel();
        clickHeaderImage(1);
    });

    //注销登入
    $('.loginOut').bind("click", function () {
        localStorage.clear();
        userId = null;
        signInInit();
    });
    
    //个人信息设置
    $('.setting-a').on("click", function () {
        settingInit();
    });

    //邀请好友
    $(".invite-friend").on("click", function () {
        /*
        显示确认邀请界面
        该界面有点击按钮，点击之后，触发getInviteCode函数获取邀请码，同时增加一个全屏DOM元素,显示背景图和具体邀请信息（包括获取到的邀请码）
        */
        // showInviteView();
        // getInviteCode();
        // showInviteCode();
        myInviteInit();
    });
}

/**
 * 信息填充
 */
var pageMessage = function (data) {
    if (data.total == 0) {
        $('.chose-page').hide();
        return;
    }
    $('.chose-page').show();
    $('.have-kitties-num').html(data.total + "&nbsp" + "kitties");

}

//分页显示
var myPagePart = function (data) {
    var totalDataNum = data.total;
    if (totalDataNum <= data.limitNum) {
        $('.chose-page').hide();
        return;
    }
    $('#chose-page-button').pagination({
        totalData: totalDataNum,
        showData: data.limitNum,
        coping: true,
        callback: function (api) {
            var index = api.getCurrent();
            waitModel();
            clickHeaderImage(index, 1);
            $('body,kitty-owner-main').animate({
                scrollTop: 0
            }, 100);
        }
    });
}


/**
 * kitties信息
 */
var kittyMessage = function (data) {
    if (data.total == 0) { //无查询数据时，进行提示
        $('.all-kitties-message').append(NokittiesMessage);
        return;
    };
    $('.no-kitty-show').remove(); //去除无数据提示，防重复
    var itemText = "";
    var itemprice = 0;
    var kittyName = "";
    var imgUrl = "";
    for (var i = 0; i < data.kitties.length; i++) {
        if (data.kitties[i].status.is_ready) { //判断狗状态， ready--sire\sale; noReady--reste/gestate
            if (data.kitties[i].auction.type == "sire") {
                itemText = LText.Siring;
                itemprice = (parseFloat(data.kitties[i].auction.current_price) * ethRate).toFixed(3);
                imgUrl = "./module/myKitties/image/eggplant.svg";
            } else if (data.kitties[i].auction.type == "sale") {
                itemText = LText.ForSale;
                itemprice = (parseFloat(data.kitties[i].auction.current_price) * ethRate).toFixed(3);
                imgUrl = "./module/myKitties/image/tag.svg";
            }
        } else {
            if (!data.kitties[i].status.is_gestating) {
                itemText = LText.Resting;
                itemprice = MillisecondToDate_text(data.kitties[i].left_cooldown);
                imgUrl = "./module/myKitties/image/timer.svg";
            } else {
                itemText = LText.Gestating;
                itemprice = MillisecondToDate_text(data.kitties[i].left_cooldown);
                imgUrl = "./module/myKitties/image/oven.svg";
            }
        }
        if (isNaN(data.kitties[i].name)) { //判断狗名子是否存在
            kittyName = decodeURIComponent(data.kitties[i].name);
        } else {
            kittyName = LText.Kitty;
        }
        var text =
            '<div class="kitty-list-item" id="myKitty-' + data.kitties[i].id + '">' +
            '<div class="list-item-container" id="myKittiess' + data.kitties[i].id + '">' +
            '<image class="kitty-item-photos" src="' + data.kitties[i].image_url + '">' +
            '<div class="list-item-status" id="myKittiess-status' + data.kitties[i].id + '">' +
            '<div class="list-status-item">' +
            '<i class="list-status-itemIcon" style="background-image:url(' + imgUrl + ')"></i>' +
            '<span class="list-status-itemText">' + itemText + '</span>' +
            '<small style="color: #9c9c9b">≡</small>' +
            '<span class="list-status-itemprice" style="color: #9c9c9b">' + itemprice + '</span>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="list-item-name">' + kittyName + ' #' + data.kitties[i].id + '</div>' +
            '<div class="list-kitty-bottom">' +
            '<div class="list-item-details">' +
            '<span class="list-item-details-item">' + kittyName + '&nbsp' + data.kitties[i].id + '</span>' +
            '<span class="list-item-details-item">' + ' · ' + LText.Generation + '&nbsp' + data.kitties[i].generation + '</span>' +
            '<span class="list-item-details-item-cooldown">' + ' · ' + cooldown[data.kitties[i].status.cooldown_index] + '</span>' +
            '</div>' +
            '<div class="list-item-actions">' +
            '<div class="list-item-actions-action">' +
            '<span class="list-item-actions-icon"></span>' +
            '<span class="list-item-actions-number">' + data.kitties[i].purrs.count + '</span>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';

        $('.all-kitties-message').append(text);
        $(".list-item-actions-icon").css("background-image", "url(./module/detail/img/zan.png)");

        $('#myKittiess' + data.kitties[i].id + '').css("background-color", data.kitties[i].color);
        if (data.kitties[i].status.is_ready && data.kitties[i].auction.type == "") {
            $('#myKittiess-status' + data.kitties[i].id + '').hide();
        }

        //绑定进入详情页面的点击事件
        $("#myKitty-" + data.kitties[i].id + " .kitty-item-photos").bind("click", {
            indexData: data.kitties[i]
        }, jumpKittyPage);

        //绑定点赞的点击事件
        $("#myKitty-" + data.kitties[i].id + " .list-item-actions-icon").bind("click", {
            indexData: data.kitties[i]
        }, clickMyKittyPraise);
    }
    pageMessage(data);
}

//点击猫跳转详情页面
var jumpKittyPage = function (e) {
    var chooseData = e.data.indexData;
    var params = {
        "kitty_id": chooseData.id
    }
    kittyInit(params);
}

//点赞
var clickMyKittyPraise = function (e) {

    var chooseData = e.data.indexData;
    //userId(operate_id), kitty_id, owner_id, type = 3(点赞专用)
    clickPraise(chooseData.id, "myKitty");
}

/**
 * 筛选排序点击事件
 */
var clickHeaderImage = function (index, type) {
    var uId = userId;
    if (myKitty_ownerId != null) { //判断主人id是否存在
        uId = myKitty_ownerId;
    }
    var y = $('.list-filter-select option:selected').attr("id");
    var w = $('#kittyType1 .filter-item-addclass').attr("id");
    var q = $('#kittyCooldown1 .filter-item-addclass').attr("id");
    var t = $('#13').val();
    var index = index;
    if (isNaN(w)) { //无珍稀、普通、极品筛选条件
        w = 0;
    }
    if (!isNull(t)) { //无代数条件
        t = -1;
    } else {
        try {
            t = parseInt(t); //有代数条件，判断代数是否是数字
        } catch (e) {
            $('#13').val("");
            destory();
            return;
        }
    }
    if (!isNull(q)) { //无冷却条件
        q = -1;
    }
    $.ajax({
        url: Config.address + "homePageSelectKittyByType",
        data: {
            pageType: 4,        //点击选择的页面类型，4：所有猫
            choseType: y,
            fileType: w,
            index: index,
            userId: uId,
            searchKitty: 0,
            choseGen: t,
            choseCooldown: q,
            attr: 0,
        },
        type: "POST",
        success: function (data) {
            console.log(data);
            $(".all-kitties-message").empty();
            kittyMessage(data);
            if (type != 1) { //防止分页回调函数重置分页
                myPagePart(data);
            }
            $('.have-kitties-num').html(data.total);
            setTimeout(function () {
                if (data.kitties.length) { //当前页面没有数据时，不发请求
                    sendRequest(parseArray(data), "myKitty");
                }
            }, 10);
            destory();
        },
        error: function (xhr) {
            var text = nextJson(LText.Title, LText.SystemTitle, buttonCountOne, [LText.Ok], [OK]);
            promptText(text);
            destory();
        }
    });
}

/**
 * 显示确认邀请界面
 * 该界面有点击事件，点击确认邀请，调用getInviteCode函数，点击界面其余地方则关闭该界面
 */
var showInviteView = function () {

};

