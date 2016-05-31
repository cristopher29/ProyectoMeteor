
Template.signIn.onCreated(function() {
    //add your statement here
});

Template.signIn.onRendered(function() {
    Session.set('usernamePlaceholder',i18n('authentication.usernameOrEmail'));
    Session.set('passwordPlaceholder',i18n('authentication.password'));
    $('.error-username').hide();
    $('.error-password').hide();
});

Template.signIn.helpers({
    usernamePlaceholder: function(){
        return Session.get('usernamePlaceholder');
    },
    passwordPlaceholder: function(){
        return Session.get('passwordPlaceholder');
    }
});

Template.signIn.events({
    'submit #sign-in': function(e,t){

        e.preventDefault();

        var emailOrUsername = $('#username')
            , password = $('#password');

        if(!emailOrUsername.val()){
            Session.set('usernamePlaceholder',i18n('authentication.errors.noUsername'));
            emailOrUsername.addClass('input-error');
            $('.error-username').show();
            return;
        }
        if(!password.val()){
            Session.set('passwordPlaceholder',i18n('authentication.errors.noPassword'));
            password.addClass('input-error');
            $('.error-password').show();
            return;
        }

        emailOrUsername = emailOrUsername.val().replace(/ /g,'');
        password = password.val().replace(/ /g,'');

        Meteor.loginWithPassword(emailOrUsername, password, function(error){
            if (error){
                if(error.error === 403){
                    return Bert.alert(i18n('authentication.errors.userNotFound'),'warning', 'growl-top-right');
                }
                return Bert.alert(error.reason,'danger', 'growl-top-right');
            }
            Router.go('postsList');
        });
    },
    'keyup #username': function(e,t){
        Session.set('usernamePlaceholder','Usuario o Email');
        $('#username').removeClass('input-error');
        $('.error-username').hide();
    },
    'keyup #password': function(e,t){
        Session.set('passwordPlaceholder','Contraseña');
        $('#password').removeClass('input-error');
        $('.error-password').hide();
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