var signInText =
    '<div class="sign-in-container">' +
        // '<div class="sign-in-head">' +
        //     '<div class="sign-in-head-text">What is this meow!?</div>'+
        // '</div>'+
        '<div class="mask">' +
            '<image class="mask-logo shake shake-hard" src="./module/signIn/images/mask.png"></image>'+
        '</div>'+
        '<div class="sign-in-title">' +
            '<div class="title-login">' +
                '<div class="login-tab login-tab-selected">'+signInLangu.Login+'</div>' +
            '</div>' +
            '<div class="title-register">' +
                '<div class="register-tab">'+signInLangu.Register+'</div>' +
            '</div>' +
        '</div>' +
    '</div>';


var loginText =
    '<div class="login-content">' +
        '<div class="login-email">' +
            '<div class="login-email-text">' + signInLangu.Email + '</div>' +
            '<div class="login-email-input" >' +
                '<input type="text"/>' +
            '</div>' +
        '</div>' +
        '<div class="login-password">' +
            '<div class="login-password-text">' + signInLangu.Password + '</div>' +
            '<div class="login-password-input" >' +
                '<input type="password"/>' +
            '</div>' +
        '</div>' +
        '<div class="register-warning">' +
            '<div class="register-warning-text">' +
                signInLangu.LoginWarning+
            '</div>'+
        '</div>'+
        '<div class="ok-button">' +
            '<div class="login-button">'+signInLangu.LoginBtn+'</div>'+
        '</div>'+
    '</div>';

var registerText =
    '<div class="register-content">' +
        // '<div class="register-address">' +
        //     '<div class="register-address-text">'+signInLangu.WalletAddress+'</div>'+
        //     '<div class="register-address-input" >' +
        //         '<input type="text" />'+
        //     '</div>'+
        // '</div>'+
        '<div class="register-email">' +
            '<div class="register-email-text">'+signInLangu.Email+'</div>'+
            '<div class="register-email-input">' +
                '<input type="email"/>'+
            '</div>'+
        '</div>'+
        '<div class="register-nickname">' +
            '<div class="register-nickname-text">'+signInLangu.Nickname+'</div>'+
            '<div class="register-nickname-input">' +
                '<input type="text"/>'+
            '</div>'+
        '</div>'+
        '<div class="register-pwd">' +
            '<div class="register-pwd-text">' + signInLangu.Password + '</div>' +
            '<div class="register-pwd-input">' +
                '<input type="password"/>' +
            '</div>' +
        '</div>' +
        '<div class="register-pwd-re">' +
            '<div class="register-pwd-re-text">' + signInLangu.REPassword + '</div>' +
            '<div class="register-pwd-re-input">' +
                '<input type="password"/>' +
            '</div>' +
        '</div>' +
        '<div class="register-invitation">' +
            '<div class="register-invitation-text">' + signInLangu.Invitation + '</div>' +
            '<div class="register-invitation-input">' +
                '<input type="text" id="register-text"/>' +
                '<div class="register-invitation-detail">' + 
                    '<div class="register-invitation-detail-content">' + signInLangu.InvitationDetail + '</div>' +
                '</div>' +
            '</div>' +
        '</div>' +
        '<div class="register-warning">' +
            '<div class="register-warning-text">' +
                signInLangu.RegisterWarning +
            '</div>'+
        '</div>'+
        '<div class="ok-button">' +
            '<div class="register-button">'+signInLangu.RegisterBtn+'</div>'+
        '</div>'+
    '</div>'+
    '<div class="code-detail-background" id="code-detail-background">'+
		'<div id="code-detail-content" class="code-detail-content">'+
			'<div class="detail-close1" id="detail-close1">'+
                '<div class="detail-close1-icon"></div>'+
            '</div>'+
			'<div class="code-content">'+
				'<div id="code-top-content">'+
					'<div class="top-half-title1 half-title" id="gtop_half_title"></div>'+
					'<div class="top-half-text1" id="gtop_half_text1"></div>'+
				'</div>'+
				'<div id="code-bottom-content">'+
					'<div class="bottom-half-title1 half-title" id="gbottom_half_title"></div>'+
					'<ul class="bottom-half-text-ul">'+
						'<li><p id="bottom-half-text-ul-p1"></p></li>'+
						'<li><p id="bottom-half-text-ul-p2"></p></li>'+
					'</ul>'+
				'</div>'+
			'</div>'+
		'</div>'+
    '</div>';