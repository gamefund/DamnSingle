/**
 * 提示框
 *      传参数是要创建一个数组，例:var nextJson = {
                                    title: "Title",      //标题
                                    msg: data.msg.msg,   //提示信息
                                    bottonNum: 1,        //增加按钮数目
                                    bottonMsg: ["OK"],   //按钮内容提示
                                    func: [OK],          //按钮对应方法
                                };
 */
var promptText = function(nextJson) { // 
    var promptText = 
            '<div class="prompt-main">'+
                '<div class="prompt-body">'+
                    '<div class="prompt-tital" style="height:8vh">'+ nextJson.title +
                    '</div>'+
                    '<div class="prompt-msg">'+ nextJson.msg +
                    '</div>'+
                '</div>'+
            '</div>';
            $('body').append(promptText);
    for(var i = 0; i < nextJson.bottonNum; i++) {
        $('.prompt-msg').after(
            '<div class="prompt-next'+ i +'"style="color:#168AEF;">' +
                (isNull(nextJson.bottonMsg)?nextJson.bottonMsg[i] : "OK") +
            '</div>');
        $('.prompt-next'+ i +'').attr("nextWay", i);
        $('.prompt-next'+ i +'').click(function() {
            var x = $(this).attr("nextWay");
            function db(callback) {
                callback();
            }
            db(nextJson.func[x]);
        });
    };
}

/**
 * 返回按钮可以共用
 */
var OK = function() {
    $('.prompt-main').remove();
}