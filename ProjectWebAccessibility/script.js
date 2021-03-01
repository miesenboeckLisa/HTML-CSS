//Mit JQuery
$(document).ready(function () {
    $( "#skip_menu" ).focusin(function() {
        $(this).removeClass('hide');
    });
    $( "#skip_menu" ).focusout(function() {
        $(this).addClass('hide');
    });
});
