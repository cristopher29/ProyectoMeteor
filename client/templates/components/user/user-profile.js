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
    },
    'click .edit-profile': function(e,t){
        e.preventDefault();
        Modal.show('editProfile');
    }
});

Template.userProfile.helpers({

    isFollower: function(){

        if($.inArray(Meteor.userId(), this.followers) == -1){
            return false;
        } else {
            return true;
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