
Template.signIn.onCreated(function() {
    //add your statement here
});

Template.signIn.onRendered(function() {
    Session.set('usernamePlaceholder','Usuario o Email');
    Session.set('passwordPlaceholder','Contraseña');
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
            Session.set('usernamePlaceholder','Introduce un usuario');
            emailOrUsername.addClass('input-error');
            $('.error-username').show();
            return;
        }
        if(!password.val()){
            Session.set('passwordPlaceholder','Introduce una contraseña');
            password.addClass('input-error');
            $('.error-password').show();
            return;
        }

        emailOrUsername = emailOrUsername.val().replace(/ /g,'');
        password = password.val().replace(/ /g,'');
        // Trim and validate your fields here....

        // If validation passes, supply the appropriate fields to the
        // Meteor.loginWithPassword() function.
        Meteor.loginWithPassword(emailOrUsername, password, function(error){
            if (error){
                if(error.error === 403){
                    return Bert.alert('Usuario no encontrado','warning', 'growl-top-right');
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
    'click #login-with-twitter': function(){
        Meteor.loginWithTwitter();
    }
});