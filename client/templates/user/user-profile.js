/**
 * Created by CristoH on 21/03/2016.
 */

Template.userProfile.helpers({
    userPosts: function(){
        return Posts.find({userId: Router.current().params.userId },{sort:{createdAt: -1}});
    }
});

Template.userProfile.helpers({
    ownProfile: function(){
        var res = false;
        var userId = Router.current().params.userId;
        if(userId === Meteor.userId()){
            res = true;
        }
        return res;
    }
});