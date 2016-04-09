/**
 * Created by CristoH on 04/04/2016.
 */



Meteor.methods({
    follow: function(followerId, followeeId){

        check(followerId, String);
        check(followeeId, String);

        if(followerId === Meteor.userId() && checkUser(followeeId)){
            Meteor.users.update({_id: followeeId},{$inc: {followerCount: 1}});
            Meteor.users.update({_id: followerId},{$inc: {followingCount: 1}});

            Meteor.users.update({_id: followeeId},{$push: {followers: followerId}});
            Meteor.users.update({_id: followerId},{$push: {following: followeeId}});

            Meteor.call('createNotification', followeeId, null, null ,followerId, Meteor.user().username, 'follow');
        } else {
            throw new Meteor.Error("invalid-user", "El usuario no existe");
        }


    },
    unfollow: function(followerId, followeeId){

        check(followerId, String);
        check(followeeId, String);

        if(followerId === Meteor.userId() && checkUser(followeeId)){

            Meteor.users.update({_id: followeeId},{$inc: {followerCount: -1}});
            Meteor.users.update({_id: followerId},{$inc: {followingCount: -1}});

            Meteor.users.update({_id: followeeId},{$pull: {followers: followerId}});
            Meteor.users.update({_id: followerId},{$pull: {following: followeeId}});

        } else {
            throw new Meteor.Error("invalid-user", "El usuario no existe");
        }



    }
});