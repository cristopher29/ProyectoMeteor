/**
 * Created by CristoH on 30/03/2016.
 */

Template.userProfilePosts.onCreated(function(){

    var instance = this;
    instance.limit = new ReactiveVar(10);
    instance.loaded = new ReactiveVar(0);

    instance.autorun(function(){

        instance.handle = Meteor.subscribeWithPagination('userProfilePosts', Router.current().params.userId, 10);

    });

});

Template.userProfilePosts.onRendered(function(){

    var instance = this;
    infiniteScrollPosts(instance);

    instance.autorun(function(){

        instance.loaded.set(Posts.find().count());

    });
});

Template.userProfilePosts.helpers({

    'subReady': function(){
        return Template.instance().handle.ready();
    },

    profilePosts: function(){
       return Posts.find();
   }
});