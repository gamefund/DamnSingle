var sireText = 
    '<div class="sire-container">'+
        '<div class="sire-content">'+
            '<div class="sire-top-title">'+LText.SireTitle+'</div>'+
            '<div class="bill-detail">'+
                '<div class="spend-person">'+LText.You+'</div>'+
                '<div class="spend">'+
                    '<small class="befor-spend-sum">≡</small>'+
                    '<span class="spend-sum"></span>'+
                '</div>'+
                '<div class="spend-exequt">'+LText.Exequt+'</div>'+
            '</div>'+
            '<div class="sire-introduction">'+
                '<div class="left-text"><span class="kitty-up-name left-name"></span> '+LText.WillEgg+'</div>'+
                '<div class="right-text"><span class="kitty-up-name right-name"></span> '+LText.WillSire+'</div>'+
            '</div>'+
            '<div class="sire-kitty">'+
                '<div class="left-kitty"></div>'+
                '<div class="love-heart"></div>'+
                '<div class="right-kitty">'+
                    '<div class="right-kitty-spend"></div>'+
                '</div>'+
            '</div>'+
            '<div class="kitty-detail">'+
                '<div class="left-kitty-detail">'+
                    '<div class="left-date-tube"></div>'+
                    '<div class="left-kitty-gen"></div>'+
                    '<div class="left-kitty-cool"></div>'+
                '</div>'+
                '<div class="right-kitty-detail">'+
                    '<div class="right-date-tube"></div>'+
                    '<div class="right-kitty-gen"></div>'+
                    '<div class="right-kitty-cool"></div>'+
                '</div>'+
            '</div>'+
            '<div class="my-kitties-choose">'+
                '<div class="choose-text">'+LText.ChooseKitty+'</div>'+
                '<div class="select-input">'+
                '</div>'+
            '</div>'+
            '<div class="bottom-introduction">'+
                '<div class="bottom-text">'+LText.ClickTip+'</div>'+
                '<div class="bottom-warning">'+LText.SireWarning+'</div>'+
                '<div class="ok-btn">'+LText.GivePrivacy+'</div>'+
            '</div>'+
        '</div>'+
    '</div>';

/**
 * 我的交配猫select
 * @type {string}
 */
var my_kittiesSelect =
    '<select validateevent="true" onchange="chooseSireKitty()">' +
    '<option value="">Please choose your Kitty</option>' +
    '</select>';