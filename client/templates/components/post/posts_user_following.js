/**
 * Created by CristoH on 09/05/2016.
 */

Template.postsUserFollowing.onCreated(function(){

    var instance = this;

    instance.limit = new ReactiveVar(10);
    instance.loaded = new ReactiveVar(0);
    instance.subCount = new ReactiveVar(0);
    instance.subReady = new ReactiveVar(false);

    var currentUser = Meteor.userId();

    if(currentUser){
        instance.autorun(function(){
            var sub = Meteor.subscribe('postsUserFollowing', currentUser ,instance.limit.get());
            instance.subReady.set(sub.ready());
        });
    }else{
        Router.go('accessDenied');
    }


});

Template.postsUserFollowing.onRendered(function(){

    var instance = this;

    infiniteScrollPosts(instance);

    instance.autorun(function(){

        if(instance.subReady.get()){

            instance.loaded.set(Posts.find().count());
        }

    });

});

Template.postsUserFollowing.helpers({

    'noReady': function(){
        return !Template.instance().subReady.get();
    },

    posts: function(){

        return Posts.find({ $or:
            [
                { userId: Meteor.user().following },
                { userId: Meteor.userId() }
            ]
        }, {sort :{createdAt: -1}});
    }
});


Template.postsUserFollowing.events({
    'click .load-more': function(){
        var actualLimit = Template.instance().limit.get();
        var newLimit = actualLimit+ 10;
        Template.instance().limit.set(newLimit);
    }
});