﻿/**
 * 初始化函数
 * @param {*} params 
 */
var kittyInit = function (params) {
    fadeInOutLoad(detailPageLoad, params);
};

/**
 * 猫详情页面初始加载内容
 */
var detailPageLoad = function (params) {
    var kitty_id = params.kitty_id;
    var obj = {
        "page": "kittyInit",
        "paramJson": params
    };
    leftToRightArray.push(obj);
    headerInit();
    removeHeaderLine(); //移除header的导航栏选中下划线
    $("#all-container").append(kitteDataText);
    // 点击跳转至 销售或交配选择页面
    var sale_params = {
        "kitty_id": kitty_id,
    }
    //绑定交配点击事件
    $(".kitty-owner-chose div:eq(" + 0 + ")").click(function () {
        sale_sireInit(sale_params);
    });
    //绑定出售点击事件
    $(".kitty-owner-chose div:eq(" + 1 + ")").click(function () {
        sale_sellInit(sale_params);
    });
    //绑定赠送点击事件
    $(".kitty-owner-chose div:eq(" + 2 + ")").click(function () {
        sale_giftInit(sale_params);
    });

    //跳转我的猫界面
    $(".kitty-owner-name, .kitty-owner-message-img").click(function () {
        console.log(detail_kitty_ownerId);
        var params = {
            "kittyOwnerId": detail_kitty_ownerId,
        };
        myKittyInit(params);
    });

    //点击购买or去交配按钮
    $(".buy-button").click(function () {
        console.log(detail_kitty_type);
        if (userId != null) {
            waitModel();
            if (detail_kitty_type == 2) {
                if (detail_kitty_ownerId == userId) {
                    cancelSireKitty(kitty_id);
                } else {
                    var params = {
                        "kitty_id": kitty_id
                    }
                    sireInit(params);
                }
            } else if (detail_kitty_type == 1) {
                // buyInit();
                if (detail_kitty_ownerId == userId) {
                    cancelSellKitty(kitty_id);
                } else {
                    // buyKittyAjax(kitty_id, 1);
                    buyKittyInit(detail_kitty_data);
                }
            }
        } else {
            signInInit();
        }
    });
    getKittyDetailAjax(kitty_id); //请求相应id的详情页面数据

    // 点赞按钮的点击
    $("#kitty-detail-zan").bind("click", function () {
        clickPraise(kitty_id, "detail");
        // praisedKitty(true); //点赞后立刻屏蔽点击事件
    });
    getIsPraisedInfo(kitty_id);
}

/**
 * 取消交配
 */
var cancelSireKitty = function (kittyId) {
    $.ajax({
        url: Config.address + "sire/cancelSireKitty",
        data: {
            userId: userId,
            kitty_id: kittyId,
        },
        type: "POST",
        success: function (response) {
            console.log(response);
            var text = nextJson(LText.Title, response.error, 1, [LText.Cancle], [cancel]);
            promptText(text);
            destory();
        },
        error: function (xhr) {
            var text = nextJson(LText.Title, LText.SystemTitle, 1, [LText.Ok], [OK]);
            promptText(text);
            destory();
        }
    });
}

/**
 * 取消销售
 */
var cancelSellKitty = function (kittyId) {
    $.ajax({
        url: Config.address + "cancelSellKitty",
        data: {
            userId: userId,
            kitty_id: kittyId,
        },
        type: "POST",
        success: function (response) {
            console.log(response);
            var text = nextJson(LText.Title, response.error, 1, [LText.Cancle], [cancel]);
            promptText(text);
            destory();
        },
        error: function (xhr) {
            var text = nextJson(LText.Title, LText.SystemTitle, 1, [LText.Ok], [OK]);
            promptText(text);
            destory();
        }
    });
}

/**
 * 显示冷却等级界面
 */
var addCoolDownView = function (data) {

    if ($(".div-cooldown-detail-body").length >= 1) {
        $(".div-cooldown-detail-content")[0].remove();
        return;
    }
    var index = data.cooldown_index;
    $("#all-container").append(cooldownText);
    var levelList = $(".div-cooldown-level");
    for (var i = 0; i < cooldown.length; i++) {
        levelList.append(
            "<div class='div-cooldown-level-list'>" +
            "<span class='div-cooldown-level-left'>" +
            cooldown[i] + ":" +
            "</span>" +
            "<span class='div-cooldown-level-right'>" +
            cooldownExplain[i] +
            "</span>" +
            "</div>"
        );
    }
    $(".div-cooldown-level-list").eq(index).css("color", "black");
};


var hideCooldown = function () {
    var showName = "animate-show-cooldown";
    var hideName = "animate-hide-cooldown";
    $(".div-cooldown-detail-content").fadeOut(500);
};

var showCooldown = function () {
    var showName = "animate-show-cooldown";
    var hideName = "animate-hide-cooldown";
    $(".div-cooldown-detail-content").fadeIn(500);
};

//获取当前用户是否点赞此猫的点赞信息
var getIsPraisedInfo = function (kitty_id) {
    var arr = new Array();
    arr.push(kitty_id);
    sendRequest(arr, "detail");
}

/**
 * 购买kittyAjax
 */
var buyKittyAjax = function (kittyId, type) {
    $.ajax({
        url: Config.address + "purchaseKitty",
        data: {
            userId: userId,
            kittyId: kittyId,
            type: type
        },
        type: "POST",
        success: function (data) {
            console.log(data);
            if (isNull(data.error) || (data.msg.state != 1)) {
                var text = nextJson(LText.Title, LText.SystemTitle, 1, [LText.Ok], [OK]);
                promptText(text);
                destory();
            } else {
                var text = nextJson(LText.Title, data.error, 1, [LText.Cancle], [cancel]);
                promptText(text);
                destory();
            }
        },
        error: function (xhr) {
            var text = nextJson(LText.Title, LText.SystemTitle, 1, [LText.Ok], [OK]);
            promptText(text);
            destory();
        }
    });

}

/**
 * 获取猫咪详情
 * @param {*} kitty_id 
 */
var detail_kitty_ownerId;
var detail_kitty_type;
var detail_kitty_data;
var getKittyDetailAjax = function (kitty_id) {
    waitModel();
    $.ajax({
        url: Config.address + "getKittyDetail",
        data: {
            id: kitty_id
        },
        type: "POST",
        success: function (data) {
            console.log(data);
            detail_kitty_ownerId = data.msg.dataMap.owner_id;
            detail_kitty_data = data.msg.dataMap;
            if (data.msg.dataMap.auction == undefined) {
                detail_kitty_type == "";
            } else {
                detail_kitty_type = data.msg.dataMap.auction.type;
            }
            loadKittyDetail(data.msg);
            destory();
        },
        error: function (xhr) {
            var text = nextJson(LText.Title, LText.SystemTitle, 1, [LText.Cancle], [cancel]);
            promptText(text);
            destory();
        }
    });
}

/**
 * 判断数据是否正常，并加载
 * @param data
 */
var loadKittyDetail = function (data) {
    if (data.msg == "SUCCESS") {
        kitty_datail(data.dataMap);
    } else if (data == "FALSE") {
        console.log("kitty_id is null");
        var text = nextJson(LText.Title, data.error, 1, [LText.Cancle], [cancel]);
        promptText(text);
    }
}

/**
 * 信息填充
 * @param {*} data 
 */
var kitty_datail = function (data) {
    var kittyName = null;
    var nickName = "";
    try {
        if (data.name == undefined) {
            kittyName = LText.Kitty;
            nickName = kittyName + " #" + data.id;
        } else {
            kittyName = data.name;
            nickName = kittyName;
        }
    } catch (e) {
        kittyName = LText.Kitty;
        nickName = kittyName + " #" + data.id;
    }
    $('.kitty-message-name').html(kittyName + " #" + data.id);
    $('.kitty-message-name-small').html(kittyName + "&nbsp" + data.id);
    $('.kitty-message-gen').html(LText.Generation + "&nbsp" + data.generation);
    $('.kitty-data-img').css("backgroundImage", "url(" + data.image_url + ")");

    // 此处简介信息移动到,添加属性时
    // var introduce = null;
    // if (data.bio == null || data.bio == "" || data.bio == undefined) {
    //     introduce = "Hello! I am " + kittyName + " #" + data.id + ". I'm a professional Train Conductor and I love ice cream. " +
    //         "I put pickles on everything. Like, everything: hot dogs, wet food！everything! Maybe you and I can be partners in crime. "
    // } else {
    //     introduce = data.bio;
    // }
    $('.kitty-bio-message').html(Introduce.OpenWhite + nickName + ".");

    $('.kittyPage-up-part').css("background-color", data.color);
    kitty_status(data);
    kitty_owner(data);

    if (data.matron == null || data.sire == null) {
        $('.kitty-parent-all').hide();
        $('.kitty-parents').hide();
    } else {
        motherMessage(data);
        fatherMessage(data);
    }
    if (data.children.length == 0) {
        $('.kitty-childrens-all').hide();
        $('.kitty-childrens').hide();
    } else {
        childrenMessage(data);
    }
    // $('.zan-num').html(data.purrs.count);
    $('.zan-num').html(data.purr_count);
    cattributesMessage(data);
    addCoolDownView(data);
    $(".kitty-message-comment, .kitty-message-cooldown").on("touchstart", function () {
        showCooldown();
    });
    $(".kitty-message-comment, .kitty-message-cooldown").on("touchend", function () {
        hideCooldown();
    });
}

/**
 * kitty目前状态：出售、交配、休息、冷却等级
 * todo 是否怀孕待确认
 * ---0 ---(is_ready == false)正在冷却
 * ---00---(is_gestating == false)正在冷却,未怀孕的冷却（父亲）
 * ---01---(is_gestating == true )正在冷却,  怀孕的冷却（母亲）
 * 
 * ---1 ---(is_ready == true)不在冷却，已准备好（可以or正在交易）
 * ---10---(auction == undefined)不在trade表中（即还未交易）
 * ---100--(userId != data.owner_id)用户不是此猫的拥有者（不可以对此猫进行交易）
 * ---101--(userId == data.owner_id)用户即此猫的拥有者（可以对此猫进行交易）
 * 
 * ---11---(auction != undefined)在trade表中（即正在交易）
 * ---110---(isNaN(auction.type))
 * ---111---(auction.type == "1")正在出售交易
 * ---112---(auction.type == "2")正在交配交易
 * 
 * --- a ---$('.kitty-status')        //kitty状态区域（顶部显示时间、价格）
 * --- b ---$('.kitty-to-sale')       //kitty交易操作区域
 * --- c ---$('.price-change')        //kitty价格变化表
 * --- d ---$('.kitty-price-change')  //kitty开始、结束价格
 * --- e ---$(".kitty-owner-chose")   //销售、交配、赠送按钮（只有自己的猫才能操作）
 * @param {*} data 
 */
var kitty_status = function (data) {

    if (!data.is_ready) { //---0 ---
        if (!data.is_gestating) { //---00---
            $('.kitty-status').html(
                '<i class="kitty-status-icon"></i>' +
                '<span class="kitty-status-item">' + LText.Resting + "≡" + MillisecondToDate_text(data.left_cooldown) + '</span>');

            $('.kitty-status-icon').css("backgroundImage", "url(./module/detail/img/timer.svg)"); //休息照片
        } else { //---01---
            $('.kitty-status').html(
                '<i class="kitty-status-icon"></i>' +
                '<span class="kitty-status-item">' + LText.Gestating + "≡" + MillisecondToDate_text(data.left_cooldown) + '</span>');
            $('.kitty-status-icon').css("backgroundImage", "url(./module/detail/img/oven.svg)"); //怀孕照片
        }
        $('.kitty-status').show().css("display", "flex"); //--- a ---
        $(".kitty-owner-chose").hide(); //--- e ---
        $('.kitty-message-cooldown').html(cooldown[data.cooldown_index] + "&nbsp" + LText.Cooldown); //data.status.cooldown_index

    } else if (data.is_ready) { //---1 ---
        if (data.auction == undefined) { //---10---
            if (userId == data.owner_id) { //---101--
                $(".kitty-owner-chose").show().css("display", "flex"); //--- e ---
                $('.kitty-message-cooldown').html(cooldown[data.cooldown_index] + "&nbsp" + LText.Cooldown);
            } else { //---100--
                $('.kitty-message-cooldown').html(cooldown[data.cooldown_index] + "&nbsp" + LText.Cooldown);
            }
        } else { //---11---
            if (data.auction.type == "2") { //---112---

                $('.kitty-status').show().css("display", "flex"); //--- a ---
                $('.kitty-to-sale').show().css("display", "flex"); //--- b ---
                $('.price-change').show(); //--- c ---
                $('.kitty-price-change').show().css("display", "flex"); //--- d ---
                $('.kitty-status-icon').css("backgroundImage", "url(./module/detail/img/eggplant.svg)"); //交配照片

                $('.kitty-status-item').html(LText.ForSire);
                $('.kitty-now-price-name').text(LText.BreedNowPrice);
                if (userId != null) {
                    if (userId == data.auction.seller_id) {
                        $('.buy-button').html(LText.CancelSire);
                    } else {
                        $('.buy-button').html(LText.ToSire);
                    }
                } else {
                    $('.buy-button').html(LText.SignToSire);
                }
                $(".kitty-owner-chose").hide(); //--- e ---
                left_time(data);
            } else if (data.auction.type == "1") { //---111---

                $('.kitty-status').show().css("display", "flex"); //--- a ---
                $('.kitty-to-sale').show().css("display", "flex"); //--- b ---
                $('.price-change').show(); //--- c ---
                $('.kitty-price-change').show().css("display", "flex"); //--- d ---
                $('.kitty-status-icon').css("backgroundImage", "url(./module/detail/img/tag.svg)"); //出售照片

                $('.kitty-status-item').html(LText.ForSale);
                $('.kitty-now-price-name').text(LText.BuyNowPrice);
                if (userId != null) {
                    if (userId == data.auction.seller_id) {
                        $('.buy-button').html(LText.CancelSell);
                    } else {
                        $('.buy-button').html(LText.ToBuy);
                    }
                } else {
                    $('.buy-button').html(LText.SignToBuy);
                }
                // $('.buy-button').html(LText.ToBuy);
                $(".kitty-owner-chose").hide(); //--- e ---
                left_time(data);

            } else if (isNaN(data.auction.type)) { //---110---
                $('.kitty-status').hide(); //--- a ---
                $('.kitty-to-sale').hide(); //--- b ---
                $('.price-change').hide(); //--- c ---
                $('.kitty-price-change').hide(); //--- d ---
                return;
            }

            // var currentPrice = 0;
            var currentPrice = parseFloat(data.auction.current_price);
            var longStartPrice = parseFloat(data.auction.start_price);
            var longEndPrice = parseFloat(data.auction.end_price);

            // if (longCurrentPrice > longStartPrice) {
            //     currentPrice = longStartPrice;
            // } else if (longCurrentPrice < longEndPrice) {
            //     currentPrice = longEndPrice;
            // } else {
            //     currentPrice = longCurrentPrice;
            // }
            $('.kitty-status-note').html((currentPrice * ethRate).toFixed(3));
            $('.kitty-now-price-num').text((currentPrice * ethRate).toFixed(3));
            $('.kitty-sale-start-price').html((data.auction.start_price * ethRate).toFixed(3));
            $('.kitty-sale-end-price').html((data.auction.end_price * ethRate).toFixed(3));
            $('.kitty-message-cooldown').html(cooldown[data.cooldown_index] + "&nbsp" + LText.Cooldown); //data.status.cooldown_index
        }
    }
}

/**
 * kitty主人信息
 */
var kitty_owner = function (data) {
    $('.kitty-owner-name').html(decodeURIComponent(data.owner.nickname));
    // $('.kitty-owner-img-effect').css("backgroundImage", "url(" + data.owner.image + ".png)");
    $('.kitty-owner-img-effect').css("backgroundImage", "url(./module/profile/1.png)");
}

/**
 * 剩余时间
 */
var left_time = function (data) {
    var nowDate = (new Date()).valueOf();
    var left_seconds = data.auction.end_time - nowDate;
    if (left_seconds <= 0) {
        $(".kitty-sale-time-left").css("display", "none");
        $(".kitty-price-change").css("display", "none");
    } else {
        $('.sale-left-time').html(MillisecondToDate_text(left_seconds));
    }
}

//毫秒转时分秒==汉字显示时间
function MillisecondToDate_text(msd) {
    var time = parseFloat(msd) / 1000;
    if (null != time && "" != time) {
        if (time > 60 && time < 60 * 60) { //分
            time = parseInt(time / 60.0) + LText.Minute;
        } else if (time >= 60 * 60 && time < 60 * 60 * 24) { //时
            time = parseInt(time / 3600.0) + LText.Hours;
        } else if (time >= 60 * 60 * 24 && time < 60 * 60 * 24 * 30) { //天
            time = parseInt(time / 86400.0) + LText.Day;
        } else if (time >= 60 * 60 * 24 * 30 && time < 60 * 60 * 24 * 30 * 12) { //月
            time = parseInt(time / 2592000.0) + LText.Mouth;
        } else if (time >= 60 * 60 * 24 * 30 * 12) { //年
            time = parseInt(time / 31104000.0) + LText.Year;
        } else {
            time = parseInt(time) + LText.Second;
        }
    } else {
        time = 0;
    }
    return time;
}

/**
 * 父母信息
 */
var motherMessage = function (data) {
    $('.kitty-parent-left').css("backgroundImage", "url(" + data.matron.image_url + ")");
    $('.kitty-parent-left').css("background-color", data.matron.color);
    $('.kitty-parent-left').click(function () {
        var params = {
            "kitty_id": data.matron.id
        }
        kittyInit(params);
    });
}
var fatherMessage = function (data) {
    $('.kitty-parent-right').css("backgroundImage", "url(" + data.sire.image_url + ")");
    $('.kitty-parent-right').css("background-color", data.sire.color);
    $('.kitty-parent-right').click(function () {
        var params = {
            "kitty_id": data.sire.id
        }
        kittyInit(params);
    });
}

/**
 * 孩子信息
 */
var childrenMessage = function (data) {
    for (var i = 0; i < data.children.length; i++) {
        var text = '<span id=children' + i + ' onclick="jumpItsPage(event)"></span>';
        $('.kitty-childrens').append(text);
        $('#children' + i).css("backgroundImage", "url(" + data.children[i].image_url + ")");
        $('#children' + i).css("background-color", data.children[i].color);
        // $('#children' + i).click(function () {
        //     kittyInit(data.children[i].id);
        // });
        $('#children' + i).data("kittyId", data.children[i].id);
    }
}

var jumpItsPage = function (e) {
    var chooseDataId = $(e.target).data("kittyId");
    var params = {
        "kitty_id": chooseDataId
    }
    kittyInit(params);
}

/**
 * cattribute信息
 */
var cattributesMessage = function (data) {
    if (data.is_fancy) { //稀有
        displayCatrributes(LText.Fancy, 0, 1);
        if (data.cattributes.length != 0) {
            displayCatrributes(data.cattributes[0].description, 1, 1);
        }
    } else if (data.is_exclusive) { //珍贵
        displayCatrributes(LText.Exclusive, 0, 2);
        if (data.cattributes.length != 0) {
            displayCatrributes(data.cattributes[0].description, 1, 2);
        }
    } else { //普通
        if (data.cattributes.length != 0) {
            for (var i = 0; i < data.cattributes.length; i++) {
                if (data.cattributes[i].description != null) {
                    displayCatrributes(data.cattributes[i].description, i, 0);
                }
            }
        }
    }
}

/**
 * 展示状态属性
 * @param {*} cattributeText 
 * @param {*} i 
 * @param {*} fancyType 
 */
var displayCatrributes = function (cattributeText, i, fancyType) {
    if (cattributeText == undefined || cattributeText.length <= 0) {
        return;
    }
    var text = '<div id=cattribute' + i + '>' +
        '<div id=cattribute-ione' + i + '></div>' +
        '<div id=cattribute-item' + i + '></div>' +
        '</div>';
    $('.kitty-tributes-message').append(text);
    $('#cattribute' + i).addClass("cattribute");
    //设置颜色
    switch (fancyType) {
        case 1:
            //稀有
            $('#cattribute' + i).css("background-color", "#ffe888");
            $('#cattribute' + i).css("border-color", "#ffce1e");
            break;
        case 2:
            //珍贵
            $('#cattribute' + i).css("background-color", "#e0d9fd");
            $('#cattribute' + i).css("border-color", "#baadef");
            break;
        default:
            //普通
            var url = "";
            switch (i) {
                case 0:
                    url = "url(./module/detail/img/body.svg)";
                    // url = "url(./module/detail/img/brain.svg)";
                    break;
                case 1:
                    url = "url(./module/detail/img/body.svg)";
                    break;
                case 2:
                    url = "url(./module/detail/img/brain.svg)";
                    break;
                case 3:
                    url = "url(./module/detail/img/eye.svg)";
                    // url = "url(./module/detail/img/mouth.svg)";
                    break;
                default:
                    url = "url(./module/detail/img/mouth.svg)";
                    // url = "url(./module/detail/img/body.svg)";
                    break;
            }
            $("#cattribute-ione" + i).css("background-image", url);
            break;
    }
    //设置文字
    switch (cattributeText) {
        case LText.Fancy:
        case LText.Exclusive:
            //设置显示的文字
            $('#cattribute-item' + i).text(cattributeText);
            break;
        default:
            $('#cattribute-item' + i).text(LText[cattributeText]);
            break;
    }
    $('#cattribute-ione' + i).addClass("cattribute-ione");
    addBio(cattributeText);
}

/**
 * 增加简介
 * @param {*} attributeText 
 */
var addBio = function (attributeText) {
    if (Introduce[attributeText] == undefined ||
        Introduce[attributeText] == "") {
        return;
    }
    $('.kitty-bio-message').append(Introduce[attributeText] + ".");
};
