/**
 * Created by CristoH on 04/04/2016.
 */

Meteor.methods({
    follow: function(followerId, followeeId){

        if(followerId !== Meteor.userId()){
            return null;
        }

        Meteor.users.update({_id: followeeId},{$inc: {followerCount: 1}});
        Meteor.users.update({_id: followerId},{$inc: {followingCount: 1}});

        Meteor.users.update({_id: followeeId},{$push: {followers: followerId}});
        Meteor.users.update({_id: followerId},{$push: {following: followeeId}});

        Meteor.call('createNotification', followeeId, null, null ,followerId, Meteor.user().username, 'follow')
    },
    unfollow: function(followerId, followeeId){

        Meteor.users.update({_id: followeeId},{$inc: {followerCount: -1}});
        Meteor.users.update({_id: followerId},{$inc: {followingCount: -1}});

        Meteor.users.update({_id: followeeId},{$pull: {followers: followerId}});
        Meteor.users.update({_id: followerId},{$pull: {following: followeeId}});

    }
});