
Template.loginModal.events({
    'click .btn-twitter': function(){
        Meteor.loginWithTwitter();
    },
    'click .btn-facebook': function(){
        Meteor.loginWithFacebook();
    },
    'click span': function(){
        Modal.hide('loginModal')
    }
});


