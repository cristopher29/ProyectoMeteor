/**
 * Created by CristoH on 21/03/2016.
 */


Template.userProfileCard.onRendered(function(){

    $('.profile-btn').hide();

    var instance = this;

    var currentUserId;
    var sub;

    if(Router.current().route.getName() === 'userAllNotifications'){
        sub = Subsman.subscribe('userProfileInfo', Meteor.userId());
        currentUserId = Meteor.userId();
    }else{
        sub = Subsman.subscribe('userProfileInfo', Router.current().params.userId);
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

            var user = Meteor.users.findOne({_id: userId});

            if(user.followers){
                if(user.followers.indexOf(Meteor.userId()) === -1) {
                    user.isFollower = false;
                } else {
                    user.isFollower = true;
                }
            }
            return user;

        }else{

            return Meteor.users.findOne({_id: Meteor.userId()});

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
        Modal.show('editProfile');
    }
});