var myInviteInit = function() {
    fadeInOutLoad(myInvite, null);
}

var myInvite = function() {
    var obj = {
        "page": "myInviteInit",
        "paramJson": null,
    };
    leftToRightArray.push(obj);
    headerInit();
    removeHeaderLine();
    $("#all-container").append(inviteText);
    inviteLanguage();
    inviteClick();
    inviteWay();
}

var inviteLanguage = function() {
    $("#atop_half_title1").html(LText.atop_half_title1);
    $("#atop_half_title2").html(LText.atop_half_title2);
    $("#atop_half_text1").html(LText.atop_half_text1);
    $("#atop_half_text2").html(LText.atop_half_text2);
    $("#atop_half_text3").html(LText.atop_half_text3);
    $("#abottom_half_title1").html(LText.abottom_half_title1);
    $("#confirm-activation").html(LText.aconfirm_activation);
    $("#share-tips").html(LText.share_tips);
    $("#invited-name-input").attr("placeholder",LText.invited_name_input);
    $("#code-date").html(LText.code_date);
    if(localStorage.getItem(HTML_LANGUAGE) == "en") {
        $("#atop_half_text1").css("letter-spacing",0);
		$("#atop_half_text1").css("line-height","18px");
    }
}

var inviteClick = function() {
    //点击生成邀请码
	$("#confirm-activation").click(function(){
        getInviteCode();
	})
}

var draw = null;
var inviteWay = function(){
    var qrCodeText = "http://game.fund/DamnSingle/register.html?code="; 
	var deviceWidth = window.screen.width;
	var deviceHeight = window.screen.width * 1.8;
	var dpr = window.devicePixelRatio || 1;
	var canvas = $("<canvas id='qrcode-canvas'></canvas>");
	canvas.attr("width",deviceWidth);
	canvas.attr("height",deviceHeight);
	canvas.css("position", "absolute");
	canvas.css("left", "0");
	canvas.css("top", "0");
	canvas.css("z-index", "10000");
	canvas.css("display", "none");
	var ctx = canvas[0].getContext("2d");
	var bspr = ctx.webkitBackingStorePixelRatio ||
	ctx.mozBackingStorePixelRatio ||
	ctx.msBackingStorePixelRatio ||
	ctx.oBackingStorePixelRatio ||
	ctx.BackingStorePixelRatio || 1;
	var ratio = dpr / bspr;	
	canvas.css("width", canvas.attr("width"));
	canvas.css("height", canvas.attr("height"));
	canvas.attr("width", canvas.attr("width") * ratio);
	canvas.attr("height", canvas.attr("height") * ratio);
	$("#imgBox").on("click",function(){
		$(this).css("display","none");
	})


    var qrCodeOptions = {
		render: 'canvas',
        size: 0.235 * deviceWidth * ratio,
		text: "",
		correctLevel: 3,
		minVersion: 1,
        background: "#ffffff",
        foreground: "#000000",
	}
	var qrCodeData = null;
    var qrCodeCreater = function(){
		var imgBuffer = $("<div></div>");
		imgBuffer.qrcode(qrCodeOptions);
		var ctx = imgBuffer.children("canvas")[0].getContext("2d");
		qrCodeData = ctx.getImageData(0,0,imgBuffer.children("canvas")[0].width, imgBuffer.children("canvas")[0].height);
	}
	draw = function(data){
		qrCodeOptions.text = qrCodeText + data;
		qrCodeCreater();
		var imgBuffer = $("<img></img>");
		imgBuffer.attr("src", "./module/invite/image/bg-gf.png");
		// $("body").append(imgBuffer);
		imgBuffer.load(function(){
			ctx.clearRect(0,0,canvas.attr("width"), canvas.attr("height"));	
			//普通颜色
			ctx.fillStyle = "#1d901d";
			ctx.textAlign="center";
			ctx.drawImage(imgBuffer[0], 0, 0, canvas.attr("width"), canvas.attr("height"));
			ctx.putImageData(qrCodeData, canvas.attr("width") * 0.3835, canvas.attr("height") * 0.6435);

        //绘制邀请标题
            var language = localStorage.getItem(HTML_LANGUAGE);
            var in_text1 = "";
            var in_text3 = "";
            var in_text4 = "";
            in_text1 = LText.invitation_page_title1;
            in_text3 = LText.invitation_page_code;
            in_text4 = LText.invitation_page_codetip_1;
            in_text5 = LText.invitation_page_codetip_2;

            //填充邀请函内容
            if(language=="zh"){
                ctx.font= deviceWidth * ratio / 20 + "px 微软雅黑";
                ctx.fillText(in_text1 ,0.5 * deviceWidth * ratio , 0.42 * deviceHeight * ratio);

                // 绘制邀请码
                ctx.font= deviceWidth * ratio / 26 +"px 微软雅黑";
                ctx.fillStyle = "black";
                ctx.fillText(in_text3, 0.5 * deviceWidth * ratio , 0.501* deviceHeight * ratio);

                changeInvite(data, ctx, deviceWidth, deviceHeight, ratio);

                ctx.font= deviceWidth * ratio / 30 + "px 微软雅黑";
                ctx.fillStyle = "rgb(164, 151, 151)";
                ctx.fillText(in_text4,0.5 * deviceWidth * ratio,0.896 * deviceHeight * ratio);
                ctx.fillStyle = "rgb(164, 151, 151)";
                ctx.fillText(in_text5,0.5 * deviceWidth * ratio,0.916 * deviceHeight * ratio);
                ctx.fillStyle = "rgb(184, 181, 181)";
                ctx.fillText(LText.press_code_tip, 0.5 * deviceWidth * ratio , 0.795 * deviceHeight * ratio);
            }else{
                ctx.font= deviceWidth * ratio / 20 + "px Arial";
                ctx.fillText(in_text1 ,0.5 * deviceWidth * ratio , 0.42 * deviceHeight * ratio);

                // 绘制邀请码
                ctx.font= deviceWidth * ratio / 26 +"px Arial";
                ctx.fillStyle = "black";
                ctx.fillText(in_text3, 0.5 * deviceWidth * ratio , 0.501* deviceHeight * ratio);

                changeInvite(data, ctx, deviceWidth, deviceHeight, ratio);

                ctx.font= deviceWidth * ratio / 30 + "px Arial";
                ctx.fillStyle = "rgb(164, 151, 151)";
                ctx.fillText(in_text4,0.5 * deviceWidth * ratio,0.896 * deviceHeight * ratio);
                ctx.fillStyle = "rgb(164, 151, 151)";
                ctx.fillText(in_text5,0.5 * deviceWidth * ratio,0.916 * deviceHeight * ratio);
                ctx.fillStyle = "rgb(184, 181, 181)";
                ctx.fillText(LText.press_code_tip, 0.5 * deviceWidth * ratio , 0.795 * deviceHeight * ratio);		
            }
                hideModalInterface();
                $("#imgBox").children("img").attr("src", canvas[0].toDataURL());
                $("#imgBox").children("img").load(function(){
                    $("#imgBox").css("display","block");
                })
            });
        }

  
};

var changeInvite = function(data, ctx, deviceWidth, deviceHeight, ratio) {
    var msg = data.substr(0, 1);
    ctx.font= "700 "+ deviceWidth * ratio / 22 +"px Arial";
    ctx.fillText(msg, 0.2 * deviceWidth * ratio , 0.564 * deviceHeight * ratio);
    msg = data.substr(1, 1);
    ctx.font= "700 "+ deviceWidth * ratio / 22 +"px Arial";
    ctx.fillText(msg, 0.32 * deviceWidth * ratio , 0.564 * deviceHeight * ratio);
    msg = data.substr(2, 1);
    ctx.font= "700 "+ deviceWidth * ratio / 22 +"px Arial";
    ctx.fillText(msg, 0.44 * deviceWidth * ratio , 0.564 * deviceHeight * ratio);
    msg = data.substr(3, 1);
    ctx.font= "700 "+ deviceWidth * ratio / 22 +"px Arial";
    ctx.fillText(msg, 0.56 * deviceWidth * ratio , 0.564 * deviceHeight * ratio);
    msg = data.substr(4, 1);
    ctx.font= "700 "+ deviceWidth * ratio / 22 +"px Arial";
    ctx.fillText(msg, 0.676 * deviceWidth * ratio , 0.564 * deviceHeight * ratio);
    msg = data.substr(5, 1);
    ctx.font= "700 "+ deviceWidth * ratio / 22 +"px Arial";
    ctx.fillText(msg, 0.795 * deviceWidth * ratio , 0.564 * deviceHeight * ratio);
    
}


/**
 * 获取邀请码
 */
var getInviteCode = function (result) {
    var nickName = $(".owner-name").html();
    $.ajax({
        url: Config.address + "getInviteCode",
        data: {
            "nickname": nickName,
            "userId": userId,
        },
        type: "POST",
        beforedSend: function() {
            showModalInterface();
        },
        success: function (data) {
            //TODO 调用
            if (data.error) {
                var text = nextJson(LText.Title, LText.SystemTitle, buttonCountOne, [LText.Ok], [OK]);
                promptText(text);
                destory();
            } else {
                //data.msg值就是邀请码
                showInviteCode(data.msg);
                draw(data.msg);
            }
        },
        error: function (xhr) {
            var text = nextJson(LText.Title, LText.SystemTitle, buttonCountOne, [LText.Ok], [OK]);
            promptText(text);
            destory();
        }
    });
};

/**
 * 显示生成出来的邀请码以及其他信息界面
 */
var showInviteCode = function (code) {
    console.log(code);
};

var showModalInterface = function(){
    $('body').append("<div id='modle-interface'><div class='modle-interface-center'><i class='fa fa-spinner fa-pulse'></i></div></div>");
}

var hideModalInterface = function(){
    $("#modle-interface").remove();
}