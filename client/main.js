Template.registerHelper('emailVerified', function(){
    var res =  false;
    if(Meteor.userId()){
        if(Meteor.user().emails[0].verified) {
            res = true;
        }
    }
    return res;
});

