/**
 * Created by CristoH on 21/03/2016.
 */

Template.userProfileCard.onCreated(function(){

    var instance = this;

    instance.autorun(function(){

        if(Router.current().route.getName() === 'userAllNotifications'){
            instance.sub = Subsman.subscribe('userProfileInfo', Meteor.userId());
        }else{
            instance.sub = Subsman.subscribe('userProfileInfo', Router.current().params.userId);
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

Template.userProfileCard.helpers({

    isFollower: function(){

        if(Template.instance().subscriptionsReady()){
            if(this.followers.indexOf(Meteor.userId()) === -1) {
                console.log('false');
                return false;
            } else {
                console.log('true');
                return true;
            }
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
    },
    'user': function(){
        if(Router.current().params.userId){
            return Meteor.users.findOne({_id: Router.current().params.userId});
        }else{
            return Meteor.users.findOne({_id: Meteor.userId()});
        }

    }

});