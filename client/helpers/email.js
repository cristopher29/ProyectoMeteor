/**
 * Created by CristoH on 15/03/2016.
 */

Template.registerHelper('emailVerified', function(){
    var res =  false;
    if(Meteor.userId()){
        if(Meteor.user().emails[0].verified) {
            res = true;
        }
    }
    return res;
});