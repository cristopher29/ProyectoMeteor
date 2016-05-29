/**
 * Created by CristoH on 09/05/2016.
 */

Template.postsUserFollowing.onCreated(function(){

    var instance = this;

    instance.limit = new ReactiveVar(10);
    instance.loaded = new ReactiveVar(0);
    instance.subCount = new ReactiveVar(0);
    instance.subReady = new ReactiveVar(false);
    instance.userFollowing = new ReactiveVar(false);


    instance.autorun(function(){

        var currentUser = Meteor.userId();

        var sub = Subsman.subscribe('postsUserFollowing', currentUser ,instance.limit.get());

        instance.subReady.set(sub.ready());

    });

});

Template.postsUserFollowing.onRendered(function(){

    var instance = this;

    infiniteScrollPosts(instance);

    instance.autorun(function(){

        if(instance.subReady.get()){
            if(Meteor.user().following){
                instance.loaded.set(Posts.find({ userId: { $in:Meteor.user().following } }).count());
            }
        }

    });

});

Template.postsUserFollowing.helpers({

    'noReady': function(){
        return !Template.instance().subReady.get();
    },

    posts: function(){
        if(Meteor.user().following){
            return Posts.find({ userId: { $in:Meteor.user().following } }, {sort :{createdAt: -1}});
        }
    }
});


Template.postsUserFollowing.events({
    'click .load-more': function(){
        var actualLimit = Template.instance().limit.get();
        var newLimit = actualLimit+ 10;
        Template.instance().limit.set(newLimit);
    }
});