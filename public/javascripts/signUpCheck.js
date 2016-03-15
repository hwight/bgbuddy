$(window).load(function(){
        var signUpMsg = $('#resetFormSignUp').text();
        console.log(signUpMsg);
        if (signUpMsg){
          jQuery('#SignUpModal').modal('show');
        }
        console.log("here");
    });
