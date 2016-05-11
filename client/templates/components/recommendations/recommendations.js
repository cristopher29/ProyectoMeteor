/**
 * Created by CristoH on 05/05/2016.
 */

Template.recommendations.onCreated(function(){
    var instance = this;
    instance.subReady = new ReactiveVar(false);
});

Template.recommendations.onRendered(function(){

    var instance = this;
    var sub = Subsman.subscribe('recommendations');


    instance.autorun(function(){

        if(sub.ready()){
            instance.subReady.set(true);
        }

    });

});

Template.recommendations.helpers({
    'ready': function(){
        return Template.instance().subReady.get();
    },
    'users': function(){

        if(Meteor.user().following){
            return Meteor.users.find({ _id: { $ne: Meteor.userId(), $nin: Meteor.user().following } },{limit: 4,field: {profile:1, username:1}});
        }else{
            return Meteor.users.find({ _id: { $ne: Meteor.userId() } },{limit: 4, field: {profile:1, username:1}});
        }

    }
});