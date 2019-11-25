
$(document).ready(function(){


    $('#entrar').on('click',function(){

        if($('#user_').val().toLowerCase() == 'admin' && $('#pass_').val().toLowerCase() == '123'){
            
            $('#log1').hide('slow');
            $('#log2').hide('slow');
    
            window.location.href = "login.html";
        }else{
            alert("Usuário ou senha inválidos");
            $('#user_').val('')
            $("#pass_").val('')
            $('#user_').focus()
        }
       

    });

});