/**
 * Created by CristoH on 21/03/2016.
 */

Template.userProfile.events({
    'click .follow': function(e,t){
        e.preventDefault();
        if(Meteor.user()){
            Meteor.call('follow',Meteor.userId(),this._id);
        }
    },
    'click .unfollow': function(e,t){
        e.preventDefault();
        if(Meteor.user()){
            Meteor.call('unfollow',Meteor.userId(),this._id);
        }
    }
});

Template.userProfile.helpers({

    isFollower: function(){
        console.log(this.followers);

        if($.inArray(Meteor.userId(), this.followers) > -1){
            return true;
        }else {
            return false;
        }
    },
    userPosts: function(){
        return Posts.find({userId: Router.current().params.userId },{sort:{createdAt: -1}});
    },
    ownProfile: function(){
        var res = false;
        var userId = Router.current().params.userId;
        if(userId === Meteor.userId()){
            res = true;
        }
        return res;
    }
});