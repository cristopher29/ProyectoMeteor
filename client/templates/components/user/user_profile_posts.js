/**
 * Created by CristoH on 30/03/2016.
 */

Template.userProfilePosts.onCreated(function(){

    var instance = this;
    instance.limit = new ReactiveVar(10);
    instance.loaded = new ReactiveVar(0);
    instance.subReady = new ReactiveVar(false);

    instance.autorun(function(){

        var sub = instance.subscribe('userProfilePosts', Router.current().params.userId, instance.limit.get());
        instance.subReady.set(sub.ready());

        if(instance.subReady.get()){
            instance.loaded.set(Posts.find({userId: Router.current().params.userId}).count());
        }

    });

});


Template.userProfilePosts.onRendered(function(){

    var instance = this;
    infiniteScrollPosts(instance);

});

Template.userProfilePosts.helpers({

    'noPosts': function(){
        if(Template.instance().subReady.get()){
            if(Template.instance().loaded.get()<=0){
                return true;
            }
        }
    },

    profilePosts: function(){
        return Posts.find({userId: Router.current().params.userId}, {sort:{createdAt: -1}});
    },

    morePosts: function(){
        return Template.instance().loaded.get() >= Template.instance().limit.get();
    }
});

Template.userProfilePosts.events({
    'click .load-more': function(){
        var newLimit = Template.instance().limit.get() + 10;
        Template.instance().limit.set(newLimit);
    }
});