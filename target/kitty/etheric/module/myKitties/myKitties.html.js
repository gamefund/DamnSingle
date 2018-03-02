var myKittyText = 
    '<div class="kitty-owner-main">'+
        '<div class = "kitty-owner-fixed">'+
            '<div class="kitty-owner-message">'+
                '<div class="owner-headImage"></div>'+
                '<div class="owner-carte">'+
                    '<div class="owner-name">Kitty Clock</div>'+
                    '<div class="owner-address">Copy address</div>'+
                    '<div class="invite-friend" style="display: none">' + LText.InviteFriend + '</div>' +
                    '<div class="loginOut" style="display: none">'+ LText.LoginOut +'</div>' +
                    // '<div class="setting-a" style="display: none">'+ LText.Setting +'</div>'+
                '</div>'+
            '</div>'+
            '<div class="all-kitties-column">'+
                
                '<div class="kitties-column-choise">'+
                    // '<div class="kitties-column-sortby">' + LText.SortBy + '</div>'+
                    '<div class="kitties-column-down">'+          
                        '<select class="list-filter-select" placeholder="sorting order">'+
                            '<option value="youngest-first" id="5">' + LText.Youngestfirst + '</option>'+
                            '<option id="6">' + LText.Oldestfirst + '</option>'+
                            '<option id="7">' + LText.Cheapestfirst + '</option>'+
                            '<option id="8">' + LText.Mostexpensivefirst + '</option>'+
                            '<option id="9">' + LText.Mostlike + '</option>'+
                        '</select>'+
                    '</div>'+
                '</div>'+

                '<div class="filter-kitties-down">' +
                    '<div class="filter-kitties-img"></div>' +
                    LText.Filterkitties +
                '</div>'+
            '</div>'+
            '<div class="owner-kitties-num">'+
                '<div class="all-kitties-style">' + LText.AllKitties + '</div>'+

                '<div class="have-kitties">' +
                    '<div class="have-kitties-num">582.000</div>' +
                    '<span>&nbsp' + LText.Kitties + '</span>' +
                '</div>'+          
            '</div>'+
        '</div>'+

        '<div class="all-kitties-message">'+
        '</div>'+
        '<div class="chose-page">'+
            '<ul id="chose-page-button" class="M-box" maxshowpageitem="5" pagelistcount="10"></ul>' +
        '</div>'+
        
    '</div>'+

    '<!--筛选关键字选择-->' +
        '<div class="self-filterArea-background">' +
            '<div class="self-filter-displayArea">'+
                '<div class="self-filter-type self-filter-group">'+
                    '<div class="self-filter-type-title">' + LText.KittyType + '</div>'+
                    '<div class="self-filter-type-content self-filter-group-content" id="kittyType1">'+
                        '<div class="self-filter-item" id="10">' + LText.Normal + '</div>'+
                        '<div class="self-filter-item" id="11">' + LText.Fancy + '</div>'+
                        '<div class="self-filter-item" id="12">' + LText.Exclusive + '</div>'+
                    '</div>'+            
                '</div>'+
                '<div class="self-filter-generation self-filter-group">'+
                    '<div class="self-filter-generation-title">' + LText.Generation + '</div>'+
                    '<div class="self-filter-generation-content self-filter-group-content">'+
                        '<input type="number" step="1" min="0" placeholder="' + LText.AllGeneration + '" id="13">'+
                        '<button class="mykitty-gen-toSearch">'+ LText.SearchKitties +'</button>'+
                        '<button class="mykitty-gen-toCancle">'+ LText.Clear +'</button>'+
                    '</div>'+
                    // <!-- 个人消息设置 -->
                    // '<div class="self-filter-generation-reset">Reset</div>'+
                '</div>'+
                '<div class="self-filter-cooldown self-filter-group">'+
                    '<div class="self-filter-cooldown-title">' + LText.Cooldown + '</div>'+
                    '<div class="self-filter-cooldown-content-flex self-filter-group-content">'+
                        '<div class="self-filter-cooldown-content" id="kittyCooldown1" style="display: flex;flex-wrap: wrap;">'+
                            '<div class="self-filter-cooldown-Fast self-filter-item" id="14" style="flex:50%">' + LText.Fast + '</div>'+
                            '<div class="self-filter-cooldown-Swift self-filter-item" id="15" style="flex:50%">' + LText.Swift + '</div>'+
                            '<div class="self-filter-cooldown-Snappy self-filter-item" id="16" style="flex:50%">' + LText.Snappy + '</div>'+
                            '<div class="self-filter-cooldown-Brisk self-filter-item" id="17" style="flex:50%">' + LText.Brisk + '</div>'+
                            '<div class="self-filter-cooldown-Plodding self-filter-item" id="18" style="flex:50%">' + LText.Plodding + '</div>'+
                            '<div class="self-filter-cooldown-Slow self-filter-item" id="19" style="flex:50%">' + LText.Slow + '</div>'+
                            '<div class="self-filter-cooldown-Sluggish self-filter-item" id="20" style="flex:50%">' + LText.Sluggish + '</div>'+
                            '<div class="self-filter-cooldown-Catatonic self-filter-item" id="21" style="flex:50%">' + LText.Catatonic + '</div>'+   
                        '</div>'+
                    '</div>'+      
                '</div>'+
            '</div>'+
        '</div>';


var toGetInvitationCodeView =
    "<div class='div-getinvite-code'>" +
        "<div class='div-getinvite-content'>" +
        "</div>" +
    "</div>";

/**
 * 什么都没有查到，出现提示
 */

var showNoKitty = 
            '<div class="no-kitty-show">'+
                '<div class="no-kitty-show-msg1">'+ LText.NoKitties +'</div>'+
                '<div class="no-kitty-show-msg2">'+ LText.TryAgain +'</div>'+
            '</div>';


var NokittiesMessage =
            '<div class="no-kitty-show">'+
                '<div class="no-kitty-show-msg1">'+LText.NoKittyMsg1+'</div>'+
                '<div class="no-kitty-show-msg2">'+LText.NoKittyMsg2+'</div>'+
            '</div>';

var showNoActive = 
            '<div class="no-kitty-show">'+
                '<div class="no-kitty-show-msg1">'+ LText.NoActiveMessage +'</div>'+
            '</div>';
