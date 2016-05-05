/**
 * Created by CristoH on 21/03/2016.
 */

Template.userProfileCard.onCreated(function(){

    var instance = this;

    instance.subReady = new ReactiveVar(false);
    instance.user = new ReactiveVar();

});

Template.userProfileCard.onRendered(function(){

    var instance = this;

    var paramUserId = Router.current().params.userId;
    var currentUserId = Meteor.userId();
    var sub;

    if(Router.current().route.getName() === 'userAllNotifications'){
        sub = Subsman.subscribe('userProfileInfo', currentUserId);
    }else{
        sub = Subsman.subscribe('userProfileInfo', paramUserId);
    }

    instance.autorun(function(){

        instance.subReady.set(sub.ready());

    });


});

Template.userProfileCard.helpers({

    'noReady': function(){
        return !Template.instance().subReady.get();
    },

    'user': function(){

        var userId = Router.current().params.userId;
        var ready = Template.instance().subReady.get();

        if(userId && ready){

            var user = Meteor.users.findOne({_id: userId});

            if(user.followers.indexOf(Meteor.userId()) === -1) {
                user.isFollower = false;
            } else {
                user.isFollower = true;
            }

            return user;

        }else{

            return Meteor.users.findOne({_id: Meteor.userId()});

        }

    },

    ownProfile: function(){
        var res = false;
        var userId = Router.current().params.userId;

        if(Router.current().route.getName() === 'userAllNotifications'){
            res = true;
        }
        if(userId === Meteor.userId()){
            res = true;
        }
        return res;
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