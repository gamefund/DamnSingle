/**
 * 行为记录页面
 */
var activeInit = function () {
    fadeInOutLoad(activePageLoad, null);
};

/**
 * 页面初始加载内容
 */
var activePageLoad = function (params) {
    headerInit();
    removeHeaderLine(); //移除header的导航栏选中下划线
    var obj = {
        "page": "activeInit",
        "paramJson": null
    };
    leftToRightArray.push(obj);
    $("#all-container").append(activeText);
    activeAjax(1);
}

/**
 * activiry点击事件
 * @param {*} data 
 */
var activeAjax = function (index, pageType) {
    var url = "";
    var name = "";
    var index = index;
    $.ajax({
        url: Config.address + "getActive",
        type: "POST",
        data: {
            userId: userId,
            index: index,
        },
        success: function (data) {
            console.log(data);
            destory();
            if(isNull(data.msg.returnList)) {      //判断查询数据是否为空
                var e = data.msg.returnList;
                $('.no-kitty-show').remove();
                $('.active-body').empty();
                for(var i = 0; i < e.length; i++) {    //遍历查询出来的数据
                    if(e[i].type == 1 || e[i].type == 4 || e[i].type == 6) {       // 根据操作的类型选择对应的图标 1、4、6表示出售、取消出售
                        url = projectName + "/module/active/img/tag.svg";
                    } else if(e[i].type == 2 || e[i].type == 5) {                  // 2、5表示交配、取消交配
                        url = projectName + "/module/active/img/eggplant.svg";
                    } else if(e[i].type == 7) {                                    // 7表示赠送
                        url = projectName + "/module/active/img/gift.svg";
                    }
                    if(!isNull(e[i].name)) {          //判断狗的名子是否为空，为空则赋一个
                        name = LText.Kitty;
                    } else {
                        name = e[i].name;
                    }
                    var introduction = languageChose(e[i].type);
                    var time = dateType(e[i].time);
                    var text =
                        '<div class="active-body-part">' +
                            '<image class="active-type-img" src="' + url + '"></image>' +
                            '<div class="active-part-body">' +
                                '<div class="active-time">' + time + '</div>' +
                                '<div class="active-part-body-msg" style="margin-top: 1vh;color: #afa9a9;">' + introduction.introduction1 + ' <span class="active-part-body-name" style="color:#e24679">' + name + "&nbsp#" + e[i].kitty_id + '</span>' +
                                    introduction.introduction2 +
                                '</div>' +
                            '</div>' +
                            '<div class="active-part-next">' + LText.ActiveMore + '</div>' +
                        '</div>';
                    $('.active-body').append(text);
                }
                if (pageType != 1) {
                    activePagePart(data.msg);
                }
            } else {     //查询结果为空，出现提示
                $('.active-body').append(showNoActive);
                return;
            }
        },
        error: function (error) {
            var text = nextJson(LText.Title, LText.SystemTitle, 1, [LText.Ok], [OK]);
            promptText(text);
            destory();
        }
    });
}

//根据返回的类型，选择对应的中英文介绍
var languageChose = function (type) {
    var introduction1 = "";
    var introduction2 = "";
    if (type == 1) {
        introduction1 = LText.SaleActive;
    } else if (type == 2) {
        introduction1 = LText.SireActiveOne;
        introduction2 = LText.SireActiveTwo;
    } else if (type == 4) {
        introduction1 = LText.CancellSaleOne;
        introduction2 = LText.CancellSaleTwo;
    } else if (type == 5) {
        introduction1 = LText.CancellSireOne;
        introduction2 = LText.CancellSireTwo;
    } else if (type == 6) {
        introduction1 = LText.BuyDogOne;
        introduction2 = LText.BuyDogTwo;
    } else if (type == 7) {
        introduction1 = LText.GiftActiveOne;
        introduction2 = LText.GiftActiveTwo;
    }
    return {
        introduction1,
        introduction2
    }
}

//分页组件的使用
var activePagePart = function (data) {
    var totalDataNum = data.num;
    if (totalDataNum <= data.limitNum) {
        $('.active-chose-page').hide();
        return;
    }
    $('.active-chose-page').show();
    $('#active-page-button').pagination({
        totalData: totalDataNum,
        showData: data.limitNum,
        coping: true,
        callback: function (api) {
            var index = api.getCurrent();
            waitModel();
            activeAjax(index, 1);
            $('.active-main').animate({
                scrollTop: 0
            }, 100);
        }
    });
}

//根据语言选择对应时间格式
var dateType = function (date) {
    var time = "";
    switch (localStorage.getItem(HTML_LANGUAGE)) {
        case "zh":
            var date = new Date(date);
            time = formatDateTime(date);
            break;
        case "en":
            time = date;
            break;
        default:
            time = date;
            break;
    }
    return time;
}

/**
 * 格式化日期
 * @param {*} date 
 */
var formatDateTime = function (date) {
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    var min = date.getMinutes();
    min = min < 10 ? ('0' + min) : min;
    var s = date.getSeconds();
    s = s < 10 ? ('0' + s) : s;
    return y + '-' + m + '-' + d + ' ' + h + ':' + min + ':' + s;
}