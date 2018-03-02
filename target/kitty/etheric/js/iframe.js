$(function(){
	//检查用户当前设备的类型
	var ua_detect = {};
	function detect(ua, platform){
		var os = this.os = {}, browser = this.browser = {},
		webkit = ua.match(/Web[kK]it[\/]{0,1}([\d.]+)/),
		android = ua.match(/(Android);?[\s\/]+([\d.]+)?/),
		osx = !!ua.match(/\(Macintosh\; Intel /),
		ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
		ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/),
		iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
		webos = ua.match(/(webOS|hpwOS)[\s\/]([\d.]+)/),
		win = /Win\d{2}|Windows/.test(platform),
		wp = ua.match(/Windows Phone ([\d.]+)/),
		touchpad = webos && ua.match(/TouchPad/),
		kindle = ua.match(/Kindle\/([\d.]+)/),
		silk = ua.match(/Silk\/([\d._]+)/),
		blackberry = ua.match(/(BlackBerry).*Version\/([\d.]+)/),
		bb10 = ua.match(/(BB10).*Version\/([\d.]+)/),
		rimtabletos = ua.match(/(RIM\sTablet\sOS)\s([\d.]+)/),
		playbook = ua.match(/PlayBook/),
		chrome = ua.match(/Chrome\/([\d.]+)/) || ua.match(/CriOS\/([\d.]+)/),
		firefox = ua.match(/Firefox\/([\d.]+)/),
		firefoxos = ua.match(/\((?:Mobile|Tablet); rv:([\d.]+)\).*Firefox\/[\d.]+/),
		ie = ua.match(/MSIE\s([\d.]+)/) || ua.match(/Trident\/[\d](?=[^\?]+).*rv:([0-9.].)/),
		webview = !chrome && ua.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/),
		safari = webview || ua.match(/Version\/([\d.]+)([^S](Safari)|[^M]*(Mobile)[^S]*(Safari))/)

		// Todo: clean this up with a better OS/browser seperation:
		// - discern (more) between multiple browsers on android
		// - decide if kindle fire in silk mode is android or not
		// - Firefox on Android doesn't specify the Android version
		// - possibly devide in os, device and browser hashes
		if (browser.webkit = !!webkit) browser.version = webkit[1]
		if (android) os.android = true, os.version = android[2]
		if (iphone && !ipod) os.ios = os.iphone = true, os.version = iphone[2].replace(/_/g, '.')
		if (ipad) os.ios = os.ipad = true, os.version = ipad[2].replace(/_/g, '.')
		if (ipod) os.ios = os.ipod = true, os.version = ipod[3] ? ipod[3].replace(/_/g, '.') : null
		if (wp) os.wp = true, os.version = wp[1]
		if (webos) os.webos = true, os.version = webos[2]
		if (touchpad) os.touchpad = true
		if (blackberry) os.blackberry = true, os.version = blackberry[2]
		if (bb10) os.bb10 = true, os.version = bb10[2]
		if (rimtabletos) os.rimtabletos = true, os.version = rimtabletos[2]
		if (playbook) browser.playbook = true
		if (kindle) os.kindle = true, os.version = kindle[1]
		if (silk) browser.silk = true, browser.version = silk[1]
		if (!silk && os.android && ua.match(/Kindle Fire/)) browser.silk = true
		if (chrome) browser.chrome = true, browser.version = chrome[1]
		if (firefox) browser.firefox = true, browser.version = firefox[1]
		if (firefoxos) os.firefoxos = true, os.version = firefoxos[1]
		if (ie) browser.ie = true, browser.version = ie[1]
		if (safari && (osx || os.ios || win)) {
			browser.safari = true
			if (!os.ios) browser.version = safari[1]
		}
		if (webview) browser.webview = true

		os.tablet = !!(ipad || playbook || (android && !ua.match(/Mobile/)) ||
			(firefox && ua.match(/Tablet/)) || (ie && !ua.match(/Phone/) && ua.match(/Touch/)))
		os.phone  = !!(!os.tablet && !os.ipod && (android || iphone || webos || blackberry || bb10 ||
			(chrome && ua.match(/Android/)) || (chrome && ua.match(/CriOS\/([\d.]+)/)) ||
			(firefox && ua.match(/Mobile/)) || (ie && ua.match(/Touch/))))
	}

	detect.call(ua_detect, navigator.userAgent, navigator.platform)

	//==========================================================================

	//新的index
	var pcText = '<div class="jumptopage-tip">' +
					'<div class="activation-successful-content">' +
						'<div class="successful-title" id="bsuccessful_title">当前页面适合在手机上浏览!</div>' +
						'<!--<div class="successfull-text" id="bsuccessfull_text">当前页面适合在手机上浏览</div>-->' +
						'<a class="activation-successful-confirm" id="bactivation_successful_confirm">确认</a>' +
					'</div>' +
				'</div>';	

	$("#wrapper #particles-js").hide();
	
	var language = localStorage.getItem("language");

	if(ua_detect.os.phone){//手机则直接跳转======$(window).width() < 500  //平板ua_detect.os.tablet
		location.href = "index.html";
	}else{
		$("#wrapper").append(pcText);
		if(language == "cn"){
			$("#wrapper .jumptopage-tip #bsuccessful_title").html("当前页面适合在手机上浏览！");
			$("#wrapper .jumptopage-tip #bactivation_successful_confirm").html("确认");
			$("body").css("font-family", "Microsoft YaHei, Arial");
		}else if(language == "en"){
			$("#wrapper .jumptopage-tip #bsuccessful_title").html("The current page is suitable for browsing on the phone!");
			$("#wrapper .jumptopage-tip #bactivation_successful_confirm").html("Ok");
		}else if(language == "ja"){
			$("#wrapper .jumptopage-tip #bsuccessful_title").html("現在のページは携帯で閲覧するのに適します！");
			$("#wrapper .jumptopage-tip #bactivation_successful_confirm").html("確認");
			$("body").css("font-family", "Microsoft YaHei, Arial");
		}else{
			$("#wrapper .jumptopage-tip #bsuccessful_title").html("The current page is suitable for browsing on the phone!");
			$("#wrapper .jumptopage-tip #bactivation_successful_confirm").html("Ok");
		}
	}

	$("#bactivation_successful_confirm").click(function(){
		$("#wrapper #particles-js").show();
		$("#wrapper").addClass("mobile-selected");
		var srcHref = "index.html";

		var text =  
				'<div class="container" style="position: absolute; left: 50%; top: 50%; margin-top: -334px; margin-left: -188px; display: flex;">' +												
					'<iframe src=' + srcHref + ' frameborder="0" style="width: 375px; height: 667px; margin: auto; border: 1px solid #c1c1c1; z-index: 10;background-color: #fff;">' +
					'</iframe>' +
				'</div>';

		$("#wrapper .jumptopage-tip").remove();
		$("#wrapper").append(text);
	})
});