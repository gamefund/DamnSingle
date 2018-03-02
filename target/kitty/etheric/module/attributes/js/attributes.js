/**
 * 属性
 */
var attributesInit = function () {
    fadeInOutLoad(attributesPageLoad,null);
};

/**
 * 属性页面初始加载内容
 */
var attributesPageLoad = function(params){
    headerInit();
    var obj = {"page":"attributesInit","paramJson":null};
    leftToRightArray.push(obj);
    $("#all-container").append(attributesText);
    removeHeaderLine();//移除header的导航栏选中下划线
    attrClick();
}

//狗属性点击事件
var attrClick = function() {
    $(".all-attributes-msg div").click(function() {
        if ($(this).hasClass("attributes-color")) {
            return;
        }
        var attributesChose = $(this).text();
        var attrId = $(this).attr("id");
        var attributesIon = $(this).children()[0].src;
        $(this).addClass('attributes-color').siblings().removeClass('attributes-color');
        marketInit();                    // 先加载市场页面
        setTimeout(function() {          // 后对市场页面的搜索栏进行样式修改
            $('.search-dog-attr-chose').show();
            $('.marketplace-search-filter .marketplace-search').css("flex","100%");
            $('.marketplace-search-toSearch').show();
            $('.marketplace-search-toCancle').show();
            $('.search-dog-attr').show();
            $('.marketplace-search-dog').show();
            $('.marketplace-search-filter').css("height", "15.2vw");
            $('.marketplace-search-dog').css("height", "15.2vw");
            $('.marketplace-search-dog').css("height", "22.8vw");
            $('.marketplace-search-filter').css("height", "22.8vw");
            $('.search-dog-attr-chose-item').html(attributesChose);
            $('.search-dog-attr-chose-item').attr("id", attrId);
            $('.search-dog-attr-chose-iton').attr("src", attributesIon);
            waitModel();
            slectCheck(1);               //样式修改后，按新的条件进行筛选排序
        }, 500);
    });
}