/**
 * Created by CristoH on 04/04/2016.
 */

Meteor.methods({

    sendVerificationLink: function() {

        var userId = Meteor.userId();

        if (!userId){
            throw new Meteor.Error('no-login', 'No hay un usuario logueado');
        }

        var user = Meteor.users.findOne({_id: userId, 'emails.0.verified': false});

        if (user){
            return Accounts.sendVerificationEmail(userId);
        }
    },

    follow: function(followerId, followeeId){

        var followeeExist = Meteor.users.findOne({_id: followeeId});

        if(followerId === Meteor.userId() && followeeExist){

            if(Meteor.user().following){

                if(Meteor.user().following.indexOf(followeeId) == -1){

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

            }else{

                Meteor.users.update({_id: followeeId},{$inc: {followersCount: 1}});
                Meteor.users.update({_id: followerId},{$inc: {followingCount: 1}});

                Meteor.users.update({_id: followeeId},{$push: {followers: followerId}});
                Meteor.users.update({_id: followerId},{$push: {following: followeeId}});

                Meteor.call('createNotification', followeeId, null ,null, null ,followerId, Meteor.user().username, 'follow', function(error,result){
                    if(error){
                        console.log('error al crear notificacion');
                    }
                });

            }

        } else {
            throw new Meteor.Error("invalid-user", "El usuario no existe");
        }


    },
    unfollow: function(followerId, followeeId){

        var followeeExist = Meteor.users.findOne({_id: followeeId});

        if(followerId === Meteor.userId() && followeeExist){


            if(Meteor.user().following.indexOf(followeeId) >= 0){

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