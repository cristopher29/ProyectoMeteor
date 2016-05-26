/**
 * Created by CristoH on 26/05/2016.
 */


Template.userProfileFollowers.helpers({

    userBgColor: function(){
        var userId = Router.current.params().userId;
        var user = Meteor.users.findOne({_id: userId});
        if(user.profile.bgColor){
            return user.profile.bgColor;
        }
    },
    userTextColor: function(){
        var userId = Router.current.params().userId;
        var user = Meteor.users.findOne({_id: userId});
        if(user.profile.textColor){
            return user.profile.textColor;
        }
    }

});