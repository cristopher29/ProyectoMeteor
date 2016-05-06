/**
 * Created by CristoH on 30/03/2016.
 */

Template.userProfilePosts.onCreated(function(){

    var instance = this;
    instance.limit = new ReactiveVar(10);
    instance.loaded = new ReactiveVar(0);
    instance.userId= new ReactiveVar();
    instance.subReady = new ReactiveVar(false);

    instance.autorun(function(){

        instance.userId.set(Router.current().params.userId);

        var sub = Subsman.subscribe('userProfilePosts', instance.userId.get(), instance.limit.get());
        instance.subReady.set(sub.ready());
    });

});

Template.userProfilePosts.onRendered(function(){

    var instance = this;
    infiniteScrollPosts(instance);


    instance.autorun(function(){

        if(instance.subReady.get()){
            instance.loaded.set(Posts.find().count());
        }

    });
});

Template.userProfilePosts.helpers({

    'noReady': function(){
        return !Template.instance().subReady.get();
    },

    profilePosts: function(){
       return Posts.find({userId: Template.instance().userId.get()},{sort:{createdAt: -1}});
   }
});
