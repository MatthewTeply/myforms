$(document).ready(function() {

    var signup_close_time = 200;

    $(".signup").click(function() {

        $("#signup_status").html("");
        $("#signup_form_div").fadeToggle(signup_close_time);
    });

    $("#close_signup_form_div").click(function () {

        //$(".black_div").fadeToggle(signup_close_time);
        $(".signup_form_div").fadeToggle(signup_close_time);
    });
});