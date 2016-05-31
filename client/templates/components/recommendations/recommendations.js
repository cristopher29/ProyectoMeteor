/**
 * Created by CristoH on 05/05/2016.
 */

Template.recommendations.onCreated(function(){

    var instance = this;
    instance.subReady = new ReactiveVar(false);

    instance.autorun(function(){
        var sub = Subsman.subscribe('recommendations');
    });

});

Template.recommendations.onRendered(function(){
    var instance = this;
});

Template.recommendations.helpers({

    'users': function(){

        if(Meteor.user() && Meteor.user().following){
            return Meteor.users.find({ _id: { $ne: Meteor.userId(), $nin: Meteor.user().following } },{limit: 4,field: {profile:1, username:1}});
        }else{
            return Meteor.users.find({ _id: { $ne: Meteor.userId() } },{limit: 4, field: {profile:1, username:1}});
        }

    },
    bgColor: function(){
        if(ActiveRoute.name(new RegExp('userProfile|userProfileFollowers|userProfileFollowing|userProfileEdit|userDifference'))){
            var userId = Router.current().params.userId;
            var user = Meteor.users.findOne({_id: userId});
            if(user && user.profile && user.profile.bgColor){
                return user.profile.bgColor;
            }
        }
    }
});

Template.recommendations.events({

    'click .follow': function(e,t){
        e.preventDefault();
        if(Meteor.user()){
            Meteor.call('follow',Meteor.userId(),this._id, function(error){
                if(error){
                    Bert.alert(error.reason, 'danger', 'growl-top-right');
                }
            });
        }
    }
});