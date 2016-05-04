/**
 * Created by CristoH on 21/03/2016.
 */

Template.userProfileCard.onCreated(function(){

    var instance = this;
    instance.subReady = new ReactiveVar(false);

    instance.autorun(function(){

        if(Router.current().route.getName() === 'userAllNotifications'){
            var handle = Subsman.subscribe('userProfileInfo', Meteor.userId());
            instance.subReady.set(handle.ready());
        }else{
            var handle = Subsman.subscribe('userProfileInfo', Router.current().params.userId);
            instance.subReady.set(handle.ready());
        }
    });

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

Template.userProfileCard.onRendered(function(){

});

Template.userProfileCard.helpers({

    'subReady': function(){
        return Template.instance().subReady.get();
    },

    'user': function(){

        if(Router.current().params.userId){

            var user = Meteor.users.findOne({_id: Router.current().params.userId});

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
