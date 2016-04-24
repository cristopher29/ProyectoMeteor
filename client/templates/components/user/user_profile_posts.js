/**
 * Created by CristoH on 30/03/2016.
 */

Template.userProfilePosts.onCreated(function(){

    var instance = this;

    instance.limit = new ReactiveVar(10);

    instance.autorun(function(){

        var limit = instance.limit.get();

        console.log("Obteniendo "+limit+" posts…");

        var subscription = instance.subscribe('userProfile', Router.current().params.userId, limit);

        if (subscription.ready()) {
            console.log("> Suscripcion lista");
        } else {
            console.log("> Suscripcion no lista");
        }

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