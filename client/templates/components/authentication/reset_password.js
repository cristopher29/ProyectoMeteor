
Template.resetPassword.onRendered(function () {
    Session.set('password1Placeholder','Nueva contraseña');
    Session.set('password2Placeholder','Repetir Contraseña');
    $('.error-password1').hide();
    $('.error-password2').hide();
});

Template.resetPassword.events({

    'submit #reset-password': function(e,t){

        e.preventDefault();
        console.log(this.token);
        var password1 = $('#password1').val();
        var password2 = $('#password2').val();

        if (password1 === password2) {
            Accounts.resetPassword(this.token, password1, function(error) {
                if (error) {
                    return Bert.alert(error.reason, 'danger', 'growl-top-right');
                }
                Bert.alert('Contraseña cambiada con exito!', 'success', 'growl-top-right');
                Router.go('signIn');
            });
        } else {
            $('#password1').addClass('input-error');
            $('#password2').addClass('input-error');
            Bert.alert('Las contraseñas no coinciden', 'warning', 'growl-top-right');
        }
    },
    'keyup #password1': function(e,t){
        Session.set('password1Placeholder','Nueva contraseña');
        $('#password1').removeClass('input-error');
        $('.error-password1').hide();
    },
    'keyup #password2': function(e,t){
        Session.set('password2Placeholder','Repetir contraseña');
        $('#password2').removeClass('input-error');
        $('.error-password2').hide();
    }
});

Template.resetPassword.helpers({
    password1Placeholder: function(){
        return Session.get('password1Placeholder');
    },
    password2Placeholder: function(){
        return Session.get('password2Placeholder');
    }
});



