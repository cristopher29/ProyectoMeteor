/**
 * Created by CristoH on 30/03/2016.
 */

Template.userProfilePosts.onCreated(function(){

    var instance = this;
    instance.limit = new ReactiveVar(10);
    instance.loaded = new ReactiveVar(0);

    instance.autorun(function(){

        instance.handle = Meteor.subscribeWithPagination('userProfile', Router.current().params.userId, 10);

    });

});

Template.userProfilePosts.onRendered(function(){

    var instance = this;
    infiniteScrollPosts(instance);

    instance.autorun(function(){

        instance.loaded.set(Posts.find().count());

    });
});