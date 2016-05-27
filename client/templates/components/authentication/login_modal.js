
Template.loginModal.events({
    'click .btn-twitter': function(e,t){
        console.log('twitter');
        alert('asdadas');
        Meteor.loginWithTwitter({},function(error){
            if(error){
                Bert.alert(error.reason,'danger','growl-top-right');
            }
        });
    },
    'click .btn-facebook': function(e,t){
        console.log('facebook');
        alert('asdadas');
        Meteor.loginWithFacebook({},function(error){
            if(error){
                Bert.alert(error.reason,'danger','growl-top-right');
            }
        });
    },
    'click span': function(e,t){
        Modal.hide('loginModal');
    }
});


