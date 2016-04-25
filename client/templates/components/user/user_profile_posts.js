/**
 * Created by CristoH on 30/03/2016.
 */

Template.userProfilePosts.onCreated(function(){

    var instance = this;

    instance.autorun(function(){

        instance.handle = Meteor.subscribeWithPagination('userProfile', Router.current().params.userId, 10);

    });

});

Template.userProfilePosts.onRendered(function(){
    infiniteScrollPosts(this);
});

Template.userProfilePosts.helpers({
    liked: function(){
        if(this.usersLiked.indexOf(Meteor.userId()) > -1){
            return true;
        }
        if(this.usersLiked.indexOf(Meteor.userId()) == -1){
            return false;
        }
    },
    userPosts: function(){
        return Posts.find({},{sort:{createdAt: -1}});
    }
});