/**
 * Created by CristoH on 05/05/2016.
 */

Template.recommendations.onCreated(function(){

    var instance = this;

    instance.subReady = new ReactiveVar(false);
    instance.user = new ReactiveVar();

});

Template.recommendations.onRendered(function(){

    var instance = this;

    var sub;

    sub = Subsman.subscribe('recommendations');

    instance.autorun(function(){

        instance.subReady.set(sub.ready());

    });


});

Template.recommendations.helpers({

    'noReady': function(){
        return !Template.instance().subReady.get();
    },

    'users': function(){

        var ready = Template.instance().subReady.get();

        if(ready){

            return Meteor.users.find({
                $and: [
                    { _id: { $ne: Meteor.userId() } },
                    { _id: { $nin: Meteor.user().followers } }
                ]
            });

        }

    }
});