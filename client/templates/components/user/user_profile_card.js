/**
 * Created by CristoH on 21/03/2016.
 */

Template.userProfileCard.events({
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

Template.userProfileCard.helpers({

    isFollower: function(){

        if($.inArray(Meteor.userId(), this.followers) == -1){
            return false;
        } else {
            return true;
        }
    },

    ownProfile: function(){
        var res = false;
        var userId = Router.current().params.userId;
        if(userId === Meteor.userId()){
            res = true;
        }
        return res;
    },
    'userId': function(){
        return Router.current().params.userId;
    }

});