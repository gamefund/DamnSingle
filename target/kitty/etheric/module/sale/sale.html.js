var sale_sireText = 
    '<div class = "sale-sireOrSell-container sale-sire-container">' +
        '<div class="sire-title">' +
            '<span></span>' +
            LText.BreedKitty +
        '</div>' +

        '<div class="sire-small-title">' +
            '<div class="title-left">' +
                '<div class="sire-to-public">' + LText.SireToThePublic + '</div>' +
            '</div>' +
            '<div class="title-right">' +
                '<div class="sire-with-ownKitties">' + LText.SireWithMyKitties + '</div>' +
            '</div>' +
        '</div>' +

        '<div class="sale-sire-content">' +
            
            '<p class="middle-content"> ' +
                '<span class="start-content">' + Active.StartContent + '</span>' +
                Active.PartContent +
            '</p>' +
        '</div>' +

        '<div class="price-content">' +
            '<p>' +
                Active.PriceContent +
            '</p>' +
        '</div>' +

        '<div class="setting-price">' +

            '<div class="finish-setting-button">' +
                '<div class="setting-button">' + LText.Done + '</div>' +
            '</div>' +
        '</div>' +
    '</div>';

    var sale_sellText = 
    '<div class = "sale-sireOrSell-container sale-sell-container">' +
        '<div class="sire-title">' +
            '<span></span>' +
            LText.SellKitty +
        '</div>' +

        '<div class="sale-sire-content">' +
            
            '<p class="middle-content"> ' +
                '<span class="start-content">' + Active.StartContent + '</span>' +
                Active.PartSellContent + 
            '</p>' +
        '</div>' +

        '<div class="price-content">' +
            '<p>' +
                Active.PriceContent + 
            '</p>' +
        '</div>' +

        '<div class="setting-price">' +

            '<div class="setting-starting-price">' +
                '<div class="setting-starting-price-text">' + LText.EnterStartPrice + '</div>' +
                '<div class="setting-starting-price-input">' +
                '<span></span>' +
                '<input type="number" class="input-starting-price " placeholder="1" />' +
                '</div>' +
            '</div>' +

            '<div class="setting-end-price">' +
                '<div class="setting-end-price-text">' + LText.EnterEndPrice + '</div>' +
                '<div class="setting-end-price-input">' +
                '<span></span>' +
                '<input type="number" class="input-end-price " placeholder="0.5" />' +
                '</div>' +
            '</div>' +

            '<div class="setting-duration">' +
                '<div class="setting-duration-text">' + LText.Duration + '</div>' +
                '<div class="setting-duration-input">' +
                    '<span>' + LText.Days + '</span>' +
                    '<input type="number" class="input-duration" placeholder="' + 1 + '" />' +
                '</div>' +
            '</div>' +

            '<div class="finish-setting-button">' +
                '<div class="setting-button">' + LText.Done + '</div>' +
            '</div>' +
        '</div>' +
    '</div>';

var sale_giftText =
    '<div class = "sale-sireOrSell-container sale-sell-container">' +
        '<div class="sire-title">' +
            '<span></span>' +
            LText.GiftKitty +
        '</div>' +
        '<div class="sale-sire-content">' +
            '<p class="middle-content"> ' +
                '<span class="start-content">' + Active.StartContent + '</span>' +
                Active.GiftContent +
            '</p>' +
        '</div>' +

        '<div class="price-content">' +
            '<p>' +
                 Active.GiftMsg +
            '</p>' +
        '</div>' +

        '<div class="setting-price">' +
            '<div class="setting-duration">' +
                '<div class="setting-duration-text">' + LText.InputOpponentId + '</div>' +
                '<div class="setting-duration-input">' +
                    '<input type="number" class="input-duration " placeholder="2" />' +
                '</div>' +
            '</div>' +

            '<div class="finish-setting-button">' +
                '<div class="setting-button">' + LText.Done + '</div>' +
            '</div>' +
        '</div>' +
    '</div>';

/**
 * 与自己猫交配界面select标签部分
 */
var my_kittiesSelect =
    '<select validateevent="true" onchange="chooseSireKitty()">' +
        '<option value="">' + LText.ChooseYourKitty + '</option>' +
    '</select>';

/**
 * 与自己猫交配界面，底部整体部分
 */
var ownerSireText =
    '<div class="my-kitties-choose">'+
        '<div class="choose-kitty-text">' + LText.ChooseAKitty + '</div>' +
        '<div class="choose-kitty-input">' +
        '</div>' +
    '</div>';

/**
 * 公开交配底部输入部分
 */
var publicSireText =
    '<div class="setting-starting-price">' +
        '<div class="setting-starting-price-text">' + LText.EnterStartPrice + '</div>' +
        '<div class="setting-starting-price-input">' +
            '<span></span>' +
            '<input type="number" class="input-starting-price " placeholder="1" />' +
        '</div>' +
    '</div>' +

    '<div class="setting-end-price">' +
        '<div class="setting-end-price-text">' + LText.EnterEndPrice + '</div>' +
        '<div class="setting-end-price-input">' +
            '<span></span>' +
            '<input type="number" class="input-end-price " placeholder="0.5" />' +
        '</div>' +
    '</div>' +

    '<div class="setting-duration">' +
        '<div class="setting-duration-text">' + LText.Duration + '</div>' +
        '<div class="setting-duration-input">' +
            '<span>' + LText.Days + '</span>' +
            '<input type="number" class="input-duration " placeholder="2" />' +
        '</div>' +
    '</div>';
