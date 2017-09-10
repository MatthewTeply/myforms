$(document).ready(function() {

    $("#signup_form").submit(function(e) {
        e.preventDefault();

        var username = $("#signup_uid").val();
        var password = $("#signup_pwd").val();
        var email = $("#signup_em").val();

        $.ajax({

            method: "POST",
            url: "signup.inc.php",
            data: {uid: username, pwd: password, em: email},
            success: function(response) {
                
                if(response == "uid_taken")
                    $("#signup_status").html("<p style='color: var(--red);'>Sorry, this username is already taken!</p>");

                else if(response == "em_taken")
                    $("#signup_status").html("<p style='color: var(--red);'>Sorry, this e-mail is already taken!</p>");

                else if(response == "pwd_error")
                    $("#signup_status").html("<p style='color: var(--red);'>Your password has to be 6 characters or longer!</p>");

                else if (response == "uid_error_special")
                    $("#signup_status").html("<p style='color: var(--red);'>Your username cannot contain special characters!</p>");

                else if (response == "uid_error")
                    $("#signup_status").html("<p style='color: var(--red);'>Your username has to contain atleast 5 characters!</p>");
                
                else if (response == "em_error")
                    $("#signup_status").html("<p style='color: var(--red);'>Your e-mail seems to not be valid!</p>");

                else {
                    $(".signup_form_div input").hide();
                    $(".signup_form_div br").hide();
                    $(".signup_form_div br").hide();
                    $("#signup_subm").hide();
                    $("#signup_status").html("<p style='color: var(--midnight);'>" + response + "</p>");
                }
            },
            error: function() {

                $("#signup_status").html("<p style='color: var(--red);'>Could not connect to our servers, try later!</p>");
            }
        });

    });
});