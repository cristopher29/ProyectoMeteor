/**
 * Created by CristoH on 21/03/2016.
 */

Template.userProfile.events({
    'click .follow': function(e,t){
        console.log(this._id);
        e.preventDefault();
        if(Meteor.user()){
            Meteor.call('follow',Meteor.userId(),this._id);
        }
    }
});

Template.userProfile.helpers({

    isFollower: function(){

        if(Meteor.user() != null && $.inArray(Meteor.userId(), this.followers)){
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