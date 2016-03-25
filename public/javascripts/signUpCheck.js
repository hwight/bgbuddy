$(window).load(function(){
        var signUpMsg = $('#resetFormSignUp').text();
        console.log(signUpMsg);
        if (signUpMsg){
          jQuery('#SignUpModal').modal('show');
        }
        var signInMsg = $('#resetFormSignIn').text();
        if (signInMsg){
          jQuery('#SignInModal').modal('show');
        }
    });
