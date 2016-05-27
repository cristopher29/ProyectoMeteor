
Template.forgotPassword.onRendered(function(){
    $('.error-email').hide();
    Session.set('emailPlaceholder','Email');
});

Template.forgotPassword.helpers({
    emailPlaceholder: function(){
        return Session.get('emailPlaceholder');
    }
});

Template.forgotPassword.events({
    'submit #forgot-password' : function(e, t) {

        e.preventDefault();
        var emailInput = $('#email');
        var email = emailInput.val();
        var emailRegex = /\S+@\S+\.\S+/;

        if (emailRegex.test(email)) {

            Accounts.forgotPassword({email: email}, function(error) {
                if (error) {
                   return Bert.alert(error.reason, 'danger', 'growl-top-right');
                }
            });
            Bert.alert('Email enviado a ' + email, 'success', 'growl-top-right');

        } else {
            emailInput.addClass('input-error');
            $('.error-email').show();
            Bert.alert('Email no válido', 'warning', 'growl-top-right');
        }
    },
    'keyup #email': function(e,t){
        var email = $('#email');
        if(validateEmail(email.val())){
            Session.set('emailPlaceholder','Email');
            email.removeClass('input-error');
            $('.error-email').hide();
        }

    }
});



