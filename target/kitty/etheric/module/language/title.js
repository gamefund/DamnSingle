var titleText = function(title) {
    var msg = "";
    switch(title) {
        case "CLICK FALSE":
        case "Sell Failed":
        case "FALSE": msg = LText.False
        break;
        case "Sell Success":
        case "CLICK SUCCESS":
        case "SUCCESS": msg = LText.Success
        break;
        case "userId Is Not Exist":
        case "Please Login first": msg = LText.LoginFirst
        break;
        case "kitty Is Not Exist" : msg = LText.Exist
        break;
        case "Please Register first": msg = LText.Register
        break;
        case "kitty Was Bought": msg = LText.Bought
        break;
        case "kitty Under The Shelf": msg = LText.UnderShelf
        break;
        case "kitty Status has been Changed": msg = LText.StatusChanged
        break;
        case "kitty No Ready": msg = LText.NoReady
        break;
        case "Buy Success": msg = LText.BuySuccess
        break;
        case "Buy Failed": msg = LText.BuyFailed
        break;
        case "kitty_id NULL" :
        case "kitty_id Is Not Exist":
        case "id error": msg = LText.idError
        break;
        case "kittyIdList FALSE":msg = LText.kittyIdListFALSE
        break;
        case "userId NULL": msg = LText.LoginFirst
        break;
        case "startPrice error": msg = LText.StartPriceerror
        break;
        case "endPrice error": msg = LText.EndPriceError
        break;
        case "duration error": msg = LText.DurationError
        break;
    }
    return msg;
}