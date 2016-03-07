/**
 * Created by CristoH on 07/03/2016.
 */


//-- http://stackoverflow.com/questions/15383273/force-email-validation-before-login-meteor
//-- http://stackoverflow.com/questions/34037439/accounts-createuser-not-sending-verification-email-when-used-in-meteor-methods
//-- http://stackoverflow.com/questions/14616524/verify-email-using-accounts-ui-package

Template.header.helpers({
    emailVerified: function(){
        if(Meteor.userId()){
            if(Meteor.user().emails){

            }
        }
    }
});