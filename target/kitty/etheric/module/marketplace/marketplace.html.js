var marketText =
    '<div class="marketplace-container">' +

        '<!--分类区-->' +
        '<div class="marketplace-classify">' +
            '<div class="classify-area for-sale classify-title-active" id="1">' + LText.ForSale + '</div>' +
            '<div class="classify-area for-siring" id="2">' + LText.Siring + '</div>' +
            '<div class="classify-area for-Generation-0" id="3">' + LText.Gen0 + '</div>' +
            '<div class="classify-area for-all" id="4">' + LText.AllKitties + '</div>' +
        '</div>' +
        '<!--搜索、筛选一行-->' +
        '<div class="marketplace-search-filter">' +
            '<!--搜索区-->' +
            '<div class="marketplace-search-dog">'+
                '<div class="marketplace-search" style="dispaly: inline-flex;display: flex;">' +
                    '<input type="text" class="search-input-content " placeholder="' + LText.SearchKitties + '">'  +  
                    '<button class="marketplace-search-toSearch">'+ LText.SearchKitties +'</button>'+
                    '<button class="marketplace-search-toCancle">X</button>'+
                '</div>' +
                '<div class="search-dog-attr-chose">'+
                    '<image class="search-dog-attr-chose-iton"/>'+
                    '<div class="search-dog-attr-chose-item" style="display: inline-flex;"></div>'+
                '</div>'+
                '<div class="search-dog-attr">'+ LText.AttributesMsg +'</div>'+
            '</div>'+
            '<!--筛选区-->' +
            '<div class="marketplace-filter">' +
                LText.Filterkitties +
            '</div>' +
        '</div>' +
        '<!--筛选数量、排序一行-->' +
        '<div class="marketplace-number-sortby">' +
            '<!--排序区-->' +
           ' <div class="marketplace-sortby">' +
                '<select class="filter-select" placeholder="sorting order">' +
                    '<option value="youngest-first" id="5">' + LText.Youngestfirst + '</option>' +
                    '<option id="6">' + LText.Oldestfirst + '</option>' +
                    '<option id="7">' + LText.Cheapestfirst + '</option>' +
                    '<option id="8">' + LText.Mostexpensivefirst + '</option>' +
                    '<option id="9">' + LText.Mostlike + '</option>' +
                '</select>' +
            '</div>' +

            '<!--筛选后的数量-->' +
            '<div class="searchOrFilter-number">' +
                '<!--<span>共有</span>-->' +
                '<span class="cats-number">0</span>' +
                '<span>' + LText.Kitties + '</span>' +
            '</div>' +
        '</div>' +

        
        '<!--内容显示区-->' +
        '<div class="marketplace-content-library">' +
            '<div class="library-container">' +
                '<div class="kitty-library">' +                          
                '</div>' +
                '<ul id="page" class="M-box" maxshowpageitem="5" pagelistcount="10"></ul>' +
            '</div>' +
        '</div>' +      
    '</div>' +

    '<!--筛选关键字选择-->' +
    '<div class="filterArea-background">' +
        '<div class="marketplace-filter-displayArea">' +
            '<div class="filter-group">' +
                '<div class="filter-group-title">' + LText.KittyType + '</div>' +
                '<div class="filter-group-content" id="kittyType">' +
                    '<div class="filter-group-item" id="10">' + LText.Normal + '</div>' +
                    '<div class="filter-group-item" id="11">' + LText.Fancy + '</div>' +
                    '<div class="filter-group-item" id="12">' + LText.Exclusive + '</div>'  +
                '</div>' +    
       
            '</div>' +
            '<div class="filter-group">' +
                '<div class="filter-group-title">' + LText.Generation + '</div>' +
                '<div class="filter-group-content">' +
                    '<input type="number" step="1" min="0" placeholder="' + LText.AllGeneration + '" id="13">' +
                    '<button class="market-gen-toSearch">'+ LText.SearchKitties +'</button>'+
                    '<button class="market-gen-toCancle">'+ LText.Clear +'</button>'+
                '</div>' +
            '</div>' +
            '<div class="filter-group">' +
                '<div class="filter-group-title">' + LText.Cooldown + '</div>' +
                '<div class="filter-group-content filter-group-content-flex">' +
                    '<div class="filter-group-content" id="kittyCooldown" style="display: flex;flex-wrap: wrap;">' +
                        '<div class="filter-group-item" id="14" style="flex:50%">' + LText.Fast + '</div>' +
                        '<div class="filter-group-item" id="15" style="flex:50%">' + LText.Swift + '</div>' +
                        '<div class="filter-group-item" id="16" style="flex:50%">' + LText.Snappy + '</div>'  +
                        '<div class="filter-group-item" id="17" style="flex:50%">' + LText.Brisk + '</div>'  +
                        '<div class="filter-group-item" id="18" style="flex:50%">' + LText.Plodding + '</div>' +
                        '<div class="filter-group-item" id="19" style="flex:50%">' + LText.Slow + '</div>' +
                        '<div class="filter-group-item" id="20" style="flex:50%">' + LText.Sluggish + '</div>'  +   
                        '<div class="filter-group-item" id="21" style="flex:50%">' + LText.Catatonic + '</div>'  +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>' +
    '</div>';
