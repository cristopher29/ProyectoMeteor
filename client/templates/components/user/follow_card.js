Template.followCard.helpers({
    userBgColor: function(){
        var userId = Router.current().params.userId;
        var user = Meteor.users.findOne({_id: userId});
        if(user.profile.bgColor){
            return user.profile.bgColor;
        }
    }
});

