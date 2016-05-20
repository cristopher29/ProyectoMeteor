/**
 * Created by CristoH on 21/03/2016.
 */


Template.userProfileCard.onRendered(function(){

    $('.profile-btn').hide();

    var instance = this;

    var currentUserId;
    var sub;

    if(ActiveRoute.name('userAllNotifications')){
        sub = Meteor.subscribe('userProfileInfo', Meteor.userId());
        currentUserId = Meteor.userId();
    }else{
        sub = Meteor.subscribe('userProfileInfo', Router.current().params.userId);
        currentUserId = Router.current().params.userId;
    }

    instance.autorun(function(){

        if(sub.ready()){
            $('.profile-btn').show();
            var exist = Meteor.users.findOne({_id: currentUserId});
            if(!exist){
                Router.go('notFound');
            }
        }

    });


});

Template.userProfileCard.helpers({

    'user': function(){

        var userId = Router.current().params.userId;

        if(userId){

            return Meteor.users.findOne({_id: userId});

        }else{

            return Meteor.users.findOne({_id: Meteor.userId()});

        }

    },

    isFollower: function(){
        if(this.followers){
            if(this.followers.indexOf(Meteor.userId()) >= 0) {
                return true;
            } else {
                return false;
            }
        }
    }
});

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
        Router.go('userProfileEdit', {userId: this._id});
    }
});