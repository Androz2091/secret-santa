(function ($) {
    "use strict";


    /*==================================================================
    [ Focus Contact2 ]*/
    $('.input100').each(function(){
        $(this).on('blur', function(){
            if($(this).val().trim() != "") {
                $(this).addClass('has-val');
            }
            else {
                $(this).removeClass('has-val');
            }
        })    
    })
  
  
    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit',function(e){

        e.preventDefault();

        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }

        if(check){
            var form = $(this);
            var data = form.serialize();
            var pass = data.split("&")[0].split("=")[1];
            var url = `https://secret-santa-api.smn.tools?code=${pass}`;
            $.ajax({
                url: url,
                type: "GET",
                success: function(data){
                    if(data.error){
                        alert(data.error);
                    }else{
                        $(".wrap-input100").hide();
                        $(".container-login100-form-btn").hide();
                        $("#foot").hide();
                        $("#res").show();
                        $("#res").html(`
                            Hey <b>${data.gifter}</b>, vous devez offrir un cadeau à <b>${data.receiver}</b>! 🍬🍬🍬
                            <br>
                            <br>
                            • Pour rappel, merci de ne pas divulguer votre match à quicquonque, c'est le principe même du jeu ❓
                            <br>
                            <br>
                            • Ne dépassez pas 5€ de budget, le but est d'offrir un petit quelque chose 😉
                            <br>
                            <br>
                            • Chaque élève de la classe a déjà un match donc ne vous désistez pas 😅
                            <br>
                            <br>
                            • Si vous avez des questions n'hésitez pas à nous contacter sur Instagram (@adelexfgs ou @smn_lfrt)
                        `);
                    }
                }
            });
        }

        return check;
    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

    function validate (input) {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if($(input).val().trim() == ''){
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }
    

})(jQuery);