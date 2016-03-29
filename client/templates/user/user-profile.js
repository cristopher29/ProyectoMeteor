/**
 * Created by CristoH on 21/03/2016.
 */

Template.userProfile.helpers({
    userPosts: function(){
        return Posts.find({userId: Meteor.userId()},{sort:{createdAt: -1}});
    },
    ownProfile: function(){

    }
});

Template.registerHelper('ownProfile', function(){

    var userPosts = Posts.find({userId: Meteor.userId()});


});