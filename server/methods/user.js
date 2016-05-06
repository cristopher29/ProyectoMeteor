/**
 * Created by CristoH on 04/04/2016.
 */

Meteor.methods({
    follow: function(followerId, followeeId){

        check(followerId, String);
        check(followeeId, String);

        if(followerId === Meteor.userId() && checkUser(followeeId)){

            var follower = Meteor.users.findOne({_id: followerId});

            if(follower.followers.indexOf(followeeId) == -1){

                Meteor.users.update({_id: followeeId},{$inc: {followersCount: 1}});
                Meteor.users.update({_id: followerId},{$inc: {followingCount: 1}});

                Meteor.users.update({_id: followeeId},{$push: {followers: followerId}});
                Meteor.users.update({_id: followerId},{$push: {following: followeeId}});

                Meteor.call('createNotification', followeeId, null ,null, null ,followerId, Meteor.user().username, 'follow', function(error,result){
                    if(error){
                        console.log('error al crear notificacion');
                    }
                });

            }else{
                throw new Meteor.Error("invalid-follow", "Ya estas siguiendo a este usuario");
            }

        } else {
            throw new Meteor.Error("invalid-user", "El usuario no existe");
        }


    },
    unfollow: function(followerId, followeeId){

        check(followerId, String);
        check(followeeId, String);

        if(followerId === Meteor.userId() && checkUser(followeeId)){

            var follower = Meteor.users.findOne({_id: followerId});

            if(follower.followers.indexOf(followeeId) >= 0){

                Meteor.users.update({_id: followeeId},{$inc: {followersCount: -1}});
                Meteor.users.update({_id: followerId},{$inc: {followingCount: -1}});

                Meteor.users.update({_id: followeeId},{$pull: {followers: followerId}});
                Meteor.users.update({_id: followerId},{$pull: {following: followeeId}});

            }else{

                throw new Meteor.Error("invalid-unfollow", "No estabas siguiendo a este usuario");

            }

        } else {
            throw new Meteor.Error("invalid-user", "El usuario no existe");
        }
    }
});