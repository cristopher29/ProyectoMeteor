/**
 * Created by CristoH on 30/03/2016.
 */

Template.userProfilePosts.onCreated(function(){

    var instance = this;
    instance.limit = new ReactiveVar(10);
    instance.loaded = new ReactiveVar(0);
    instance.userId= new ReactiveVar();
    instance.subReady = new ReactiveVar(false);

    instance.userId.set(Router.current().params.userId);

    instance.autorun(function(){

        var sub = Meteor.subscribe('userProfilePosts', instance.userId.get(), instance.limit.get());
        instance.subReady.set(sub.ready());
    });

});


Template.userProfilePosts.onRendered(function(){

    var instance = this;

    infiniteScrollPosts(instance);

    instance.autorun(function(){

        if(instance.subReady.get()){
            instance.loaded.set(Posts.find({userId: instance.userId.get()}).count());
        }

    });


});

Template.userProfilePosts.helpers({


    'hasPosts': function(){
        if(Template.instance().loaded.get()>0){
            return true;
        }
    },

    'noPosts': function(){
        if(Template.instance().subReady.get()){
            if(Template.instance().loaded.get()<=0){
                return true;
            }
        }
    },

    profilePosts: function(){
        return Posts.find({userId: Template.instance().userId.get()},{sort:{createdAt: -1}});
    },

    morePosts: function(){
        if(Template.instance().subReady.get()){
            return (Template.instance().loaded.get() >= Template.instance().limit.get());
        }
    }
});

Template.userProfilePosts.events({
    'click .load-more': function(){
        var newLimit = Template.instance().limit.get() + 10;
        Template.instance().limit.set(newLimit);
    }
});