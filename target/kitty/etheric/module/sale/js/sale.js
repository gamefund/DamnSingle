/**
 * 交配页面
 */
var sale_sireInit = function (params) {
    fadeInOutLoad(sale_sirePageLoad, params);
};

/**
 *  交配页面初始加载内容
 */
var sale_sirePageLoad = function (params) {
    var kitty_id = params.kitty_id;
    // var kitty_type = params.kitty_type;
    // var obj = {"page":"sale_sireInit","kitty_id":kitty_id,"kitty_type":kitty_type};
    var obj = {
        "page": "sale_sireInit",
        "paramJson": params
    };
    leftToRightArray.push(obj);
    headerInit();
    removeHeaderLine(); //移除header的导航栏选中下划线
    $("#all-container").append(sale_sireText);

    //默认放出交配界面
    sirePublicClick(kitty_id);

    //与公共猫交配标签事件
    $(".sale-sire-container .sire-small-title .sire-to-public").click(function () {
        sirePublicClick(kitty_id);
    });

    //与自己的猫交配标签事件
    $(".sale-sire-container .sire-small-title .sire-with-ownKitties").click(function () {
        sireOwnKittiesClick(kitty_id);
    });
}

/**
 * 放出交配标签点击执行的
 */
var sirePublicClick = function (kitty_id) {
    if ($(".sale-sire-container .sire-small-title .sire-to-public").hasClass("sale-sire-selected")) {
        return;
    }
    $(".my-kitties-choose").remove();
    $(".finish-setting-button").before(publicSireText);
    $(".sale-sire-container .sire-small-title .sire-to-public").addClass('sale-sire-selected');
    $(".sale-sire-container .setting-button").unbind("click");
    $(".sale-sire-container .setting-button").click(function () {
        waitModel();
        var start_price = $(".input-starting-price").val();
        var end_price = $(".input-end-price").val();
        var duration = $(".input-duration").val();
        var kittyId = kitty_id;
        checkReleaseSireParams(kittyId, start_price, end_price, duration);
    });
    $(".sale-sire-container .sire-small-title .sire-with-ownKitties").removeClass('sale-sire-selected');
}

/**
 * 自己的猫交配标签点击执行的
 */
var sireOwnKittiesClick = function (kitty_id) {
    if ($(".sale-sire-container .sire-small-title .sire-with-ownKitties").hasClass("sale-sire-selected")) {
        return;
    }
    $(".setting-starting-price").remove();
    $(".setting-end-price").remove();
    $(".setting-duration").remove();
    $(".finish-setting-button").before(ownerSireText);
    $(".choose-kitty-input").append(my_kittiesSelect);
    getNotSiredKitties(kitty_id);
    $(".sale-sire-container .setting-button").unbind("click");
    $(".sale-sire-container .setting-button").click(function () {
        waitModel();
        var mId = kitty_id;
        var sId = $(".choose-kitty-input select").val();
        if (!isNull(sId)) {
            msgTipFunc(LText.Title, LText.DontHave + " " + LText.Kitty, 1, [LText.Ok], [OK]);
            return;
        }
        webToSire(sId, mId, userId);
    });
    $(".sale-sire-container .sire-small-title .sire-with-ownKitties").addClass('sale-sire-selected');
    $(".sale-sire-container .sire-small-title .sire-to-public").removeClass('sale-sire-selected');
}

/**
 * 验证放出交配参数
 * @param start_price
 * @param end_price
 * @param duration
 */
var checkReleaseSireParams = function (kitty_id, start_price, end_price, duration) {
    if (checkSireAndSellParam(start_price, end_price, duration)) { //验参失败
        return;
    }
    release_sire(kitty_id, start_price, end_price, duration);
}

/**
 * 放出交配请求
 * @param kitty_id      猫ID
 * @param start_price   开始价格
 * @param end_price     最终价格
 * @param duration      时间间隔
 */
var release_sire = function (kitty_id, start_price, end_price, duration) {
    var type = 2;   //代表放出交配类型
    $.ajax({
        url: Config.address + "sire/releaseSireKitty",
        type: "POST",
        data: {
            "kitty_id": kitty_id,
            "type": type,
            "start_price": start_price,
            "end_price": end_price,
            "duration": duration,
        },
        success: function (response) {
            console.info(response);
            dealWithRSResponse(response);
        },
        error: function(error){
            msgTipFunc(LText.Title, LText.False, buttonCountOne, [LText.Ok], [OK]);
        }
    });
}

/**
 * 处理放出交配回应结果
 * @param response
 */
var dealWithRSResponse = function(response){
    switch(response.msg.state){
        case msgCode[0] :    //成功
            msgTipFunc(LText.Title, response.error, buttonCountOne, [LText.Cancle], [cancel]);
            break;
        case msgCode[2] :    //参数不完整
            msgTipFunc(LText.Title, LText.IncompleteParams, buttonCountOne, [LText.Ok], [OK]);
            break;
        case msgCode[3] :    //该dog不存在
            msgTipFunc(LText.Title, LText.NotReady, buttonCountOne, [LText.Ok], [OK]);
            break;
        case msgCode[4] :    //该dog未准备好
            msgTipFunc(LText.Title, LText.NotReady, buttonCountOne, [LText.Ok], [OK]);
            break;
        case msgCode[5] :    //该dog已经怀孕
            msgTipFunc(LText.Title, LText.AlreadyGestating, buttonCountOne, [LText.Ok], [OK]);
            break;
        case msgCode[6] :    //该dog已放出交配
            msgTipFunc(LText.Title, LText.AlreadyReleaseSire, buttonCountOne, [LText.Ok], [OK]);
            break;
        default :   //放出失败
            msgTipFunc(LText.Title, LText.False, buttonCountOne, [LText.Ok], [OK]);
    }
}

var cancel = function () {
    $('.prompt-main').remove();
    marketInit();
}

/**
 * 加载我的能够交配的猫
 * @param my_kitties
 */
var getMyKitties = function (my_kitties) {
    //我的猫数据 my_kitties
    for (var index in my_kitties) {
        var optionContent;
        try {
            optionContent = !isNull(my_kitties[index].name) ? ("Kitty #" + my_kitties[index].id) : my_kitties[index].name;
        } catch (e) {
            console.log(e);
        }
        var my_kittiesText =
            '<option value="' + my_kitties[index].id + '">' + optionContent + '</option>';
        $(".choose-kitty-input select").append(my_kittiesText);
    }
};

/**
 * 获取可以交配的kitty
 * @param kittyId
 */
var getNotSiredKitties = function (kittyId) {
    $.ajax({
        url: Config.address + "sire/getNotSiredKitties",
        type: "POST",
        data: {
            "kittyId": kittyId,
            "uId": userId
        },
        success: function (response) {
            console.log(response.msg);
            getMyKitties(response.msg);
            destory();
        },
        error: function(error){
            msgTipFunc(LText.Title, LText.False, buttonCountOne, [LText.Ok], [OK]);
        }
    });
}

/**
 * 销售页面
 */
var sale_sellInit = function (params) {
    fadeInOutLoad(sale_sellPageLoad, params);
};

/**
 * 销售页面初始加载内容
 */
var sale_sellPageLoad = function (params) {
    var kitty_id = params.kitty_id;
    var obj = {
        "page": "sale_sellInit",
        "paramJson": params
    };
    leftToRightArray.push(obj);
    headerInit();
    removeHeaderLine(); //移除header的导航栏选中下划线

    $("#all-container").append(sale_sellText);

    $(".sale-sell-container .setting-button").click(function () {
        waitModel();
        console.log(456)
        checkReleaseSellParams(kitty_id);
    });
}

/**
 * 验证放出销售参数
 * @param start_price
 * @param end_price
 * @param duration
 */
var checkReleaseSellParams = function (kitty_id) {
    var start_price = $('.input-starting-price').val();
    var end_price = $('.input-end-price').val();
    var duration = $('.input-duration').val();
    if (checkSireAndSellParam(start_price, end_price, duration)) { //验参失败
        return;
    }
    goToShop(kitty_id, start_price, end_price, duration);
}

/**
 * 上架kitty
 */
var goToShop = function (kitty_id, startPrice, endPrice, duration) {
    var seller_id = userId;
    var kitty_id = kitty_id;
    var type = 1;   //代表放出销售类型
    $.ajax({
        url: Config.address + "sellKitties",
        type: "POST",
        data: {
            start_price: startPrice,
            type: type,
            end_price: endPrice,
            duration: duration,
            seller_id: seller_id,
            kitty_id: kitty_id,
        },
        success: function (response) {
            console.info(response);
            switch(response.msg.state){
                case msgCode[5] :    //成功
                    msgTipFunc(LText.Title, response.error, buttonCountOne, [LText.Cancle], [cancel]);
                    break;
                case msgCode[1] :    //参数不完整
                    msgTipFunc(LText.Title, LText.IncompleteParams, buttonCountOne, [LText.Ok], [OK]);
                    break;
                case msgCode[2] :    //参数不完整
                    msgTipFunc(LText.Title, LText.IncompleteParams, buttonCountOne, [LText.Ok], [OK]);
                    break;
                case msgCode[3] :    //参数不完整
                    msgTipFunc(LText.Title, LText.IncompleteParams, buttonCountOne, [LText.Ok], [OK]);
                    break;
                default :     //放出失败
                    msgTipFunc(LText.Title, LText.False, buttonCountOne, [LText.Ok], [OK]);
            }
        },
        error: function (error) {
            msgTipFunc(LText.Title, LText.False, buttonCountOne, [LText.Ok], [OK]);
        }
    });
}
/**
 * 赠送kitty页面
 * @param kitty_id
 */
var sale_giftInit = function (params) {
    fadeInOutLoad(sale_giftPageLoad, params);
}

/**
 * 送猫页面初始加载内容
 */
var sale_giftPageLoad = function (params) {
    var kitty_id = params.kitty_id;
    var kitty_type = params.kitty_type;
    // var obj = {"page": "sale_giftInit", "kitty_id": kitty_id, "kitty_type": kitty_type};
    var obj = {
        "page": "sale_giftInit",
        "paramJson": params
    };
    leftToRightArray.push(obj);
    headerInit();
    removeHeaderLine(); //移除header的导航栏选中下划线
    $("#all-container").append(sale_giftText);

    $(".sale-sell-container .setting-button").click(function () {
        waitModel();
        var kId = kitty_id;
        var rId = $(".input-duration").val();
        checkGiftParams(kId, rId);
    })
}

/**
 * 验证送dog参数
 */
var checkGiftParams = function(kId,rId){
    if(!isNull(rId)){   //未输入对方的ID
        msgTipFunc(LText.Title, LText.IncompleteParams, buttonCountOne, [LText.Ok], [OK]);
        return;
    }
    giftKitty(kId, rId);
}

/**
 * 送猫请求
 * @param kId   猫ID
 * @param rId   对方ID
 */
var giftKitty = function (kId, rId) {
    $.ajax({
        url: Config.address + "giftKitty",
        type: "POST",
        data: {
            "type": 0x0011,
            "uId": userId,
            "kId": kId,
            "rId": rId,
        },
        success: function (response) {
            console.log(response);
            if(response.msg.state==msgCode[0]){     //成功
                msgTipFunc(LText.Title, response.error, buttonCountOne, [LText.Cancle], [cancel]);
            }else{      //失败
                msgTipFunc(LText.Title, LText.False, buttonCountOne, [LText.Ok], [OK]);
            }
        },
        error: function (error) {
            console.info(error);
            msgTipFunc(LText.Title, LText.False, buttonCountOne, [LText.Ok], [OK]);
        }
    });
}

/**
 * 验证放出交配及销售价格及天数参数
 * @param start_price   开始价格
 * @param end_price     最终价格
 * @param duration      价格变动天数
 * @returns {boolean}   返回boolean
 */
var checkSireAndSellParam = function(start_price, end_price, duration){
    if(!isNull(start_price) || !isNull(end_price) || !isNull(duration)){
        msgTipFunc(LText.Title, LText.IncompleteParams,buttonCountOne, [LText.Ok], [OK]);
        return true;
    }
    if(parseFloat(start_price)<parseFloat(end_price)){      //验证价格 开始价格不能小于最终价格
        msgTipFunc(LText.Title, LText.ReleasePrice, buttonCountOne, [LText.Ok], [OK]);
        return true;
    }
    var minDays = 0.001;
    if(parseFloat(duration)<minDays){       //验证最小天数 最小天数不能小于0.001
        msgTipFunc(LText.Title, LText.ReleaseDays, buttonCountOne, [LText.Ok], [OK]);
        return true;
    }
    return false;
}