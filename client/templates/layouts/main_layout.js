
Template.mainLayout.events({
    'click .resend-verification-link': function(e,t){
        e.preventDefault();
        Meteor.call( 'sendVerificationLink', function( error, result ) {
            if ( error ) {
                Bert.alert( error.reason, 'danger' , 'growl-top-right');
            } else {
                var email = Meteor.user().emails[ 0 ].address;
                Bert.alert( 'Verificación enviada a '+email+' !', 'success' ,'growl-top-right');
            }
        });
    }
});


