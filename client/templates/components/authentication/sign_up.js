
Template.signUp.onCreated(function() {
    //add your statement here
});

Template.signUp.onRendered(function() {


    Session.set('usernamePlaceholder',i18n('authentication.username'));
    Session.set('emailPlaceholder',i18n('authentication.email'));
    Session.set('password1Placeholder',i18n('authentication.password'));
    Session.set('password2Placeholder',i18n('authentication.repeatPassword'));
    $('.error-username').hide();
    $('.error-email').hide();
    $('.error-password1').hide();
    $('.error-password2').hide();

});

Template.signUp.helpers({
    usernamePlaceholder: function(){
        return Session.get('usernamePlaceholder');
    },
    emailPlaceholder: function(){
        return Session.get('emailPlaceholder');
    },
    password1Placeholder: function(){
        return Session.get('password1Placeholder');
    },
    password2Placeholder: function(){
        return Session.get('password2Placeholder');
    }
});

Template.signUp.events({
    'submit #sign-up': function(e,t){
        e.preventDefault();

        var checkForm = true;
        var username = $('#username')
            , email = $('#email')
            , password1 = $('#password1')
            , password2 = $('#password2');


        if(!email.val()){
            Session.set('emailPlaceholder',i18n('authentication.errors.emailRequired'));
            $('.error-email').show();
            email.addClass('input-error');
            checkForm=false;
        }else if(!validateEmail(email.val())){
            Bert.alert('El email no es valido','danger', 'growl-top-right');
            $('.error-email').show();
            email.addClass('input-error');
            checkForm=false;
        }

        if(!username.val()){
            Session.set('usernamePlaceholder',i18n('authentication.errors.usernameRequired'));
            $('.error-username').show();
            username.addClass('input-error');
            checkForm=false;
        }

        if(!password1.val()){
            Session.set('password1Placeholder',i18n('authentication.errors.passwordRequired'));
            $('.error-password1').show();
            password1.addClass('input-error');
            checkForm=false;
        }

        if(!password2.val()){
            Session.set('password2Placeholder',i18n('authentication.errors.passwordRequired'));
            $('.error-password2').show();
            password2.addClass('input-error');
            checkForm=false;
        }else if(password1.val().replace(/ /g,'') !== password2.val().replace(/ /g,'')){
            Bert.alert(i18n('authentication.errors.passwordNotMatch'),'danger', 'growl-top-right');
            $('.error-password2').show();
            password2.addClass('input-error');
            checkForm=false;
        }


        if(checkForm){

            var newUser = {
                username: username.val().replace(/ /g,''),
                email: email.val().replace(/ /g,''),
                password: password1.val().replace(/ /g,'')
            };

            Accounts.createUser(newUser, function(error){
                if (error) {
                    return Bert.alert(error.reason,'danger', 'growl-top-right');
                } else {
                    Router.go('postsList');
                    Bert.alert(i18n('authentication.verificationEmailSend'),'success');
                }

            });

        }else{
            return;
        }

    },
    'keyup #username': function(e,t){
        Session.set('usernamePlaceholder',i18n('authentication.username'));
        $('#username').removeClass('input-error');
        $('.error-username').hide();
    },
    'keyup #email': function(e,t){
        var email = $('#email');
        if(validateEmail(email.val())){
            Session.set('emailPlaceholder',i18n('authentication.email'));
            email.removeClass('input-error');
            $('.error-email').hide();
        }

    },
    'keyup #password1': function(e,t){
        Session.set('password1Placeholder',i18n('authentication.password'));
        $('#password1').removeClass('input-error');
        $('.error-password1').hide();
    },
    'keyup #password2': function(e,t){
        Session.set('password2Placeholder',i18n('authentication.repeatPassword'));
        $('#password2').removeClass('input-error');
        $('.error-password2').hide();
    },
    'click .btn-twitter': function(){
        Meteor.loginWithTwitter({}, function(error){
            if (error) {
                Bert.alert(error.reason,'danger','growl-top-right');
            }else{
                Router.go('postList');
            }
        });
    },
    'click .btn-facebook': function(){
        Meteor.loginWithFacebook({}, function(error){
            if (error) {
                Bert.alert(error.reason,'danger','growl-top-right');
            }else{
                Router.go('postList');
            }
        });
    }
});
