
$(document).ready(function() {
    $('.kitties-logo-name').html(LText.WebTitle);
    $('.kitties-marketplace').html(LText.MarketPlace);
    $('.error-msg').html(LText.ErrorMsg);
    $('.error-next').html(LText.SeeDogs);
    headerInit();
    removeHeaderLine();
    $('.error-next').bind({
        mouseenter: function() {
            $(this).css({"position":"relative","bottom":"1rem"});
        },
        mouseleave: function() {
            $(this).css({"position":"relative","bottom":"0rem"});
        },
        click: function() {
            $('#all-container').remove();
            window.location.href = Config.address + "etheric/index.html";
        }
    });
});