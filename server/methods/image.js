/**
 * Created by CristoH on 19/04/2016.
 */


Meteor.methods({

    'deleteCardImage': function(userId, imageId){

        Meteor.call("c.delete_by_public_id", imageId, function (error, result) {
            if(error){
                throw new Meteor.Error('error-delete-image','La imagen no pude ser eliminada');
            }

            Meteor.users.update({_id: userId},{$unset: {"profile.cardImage":"", "profile.cardImageId": ""}});

            return result;
        });
    },

   'deleteImage': function(postId ,userId, imageId){

        if(checkUser(userId) && Meteor.user()){
            var post = Posts.findOne({_id: postId});
            if(post.userId === userId){

                Meteor.call("c.delete_by_public_id", imageId, function (error, result) {
                    if(error){
                        throw new Meteor.Error('error-delete-image','La imagen no pude ser eliminada');
                    }

                    Posts.update({_id: postId},{$unset: {image:"", imageId: ""}});

                    return result;
                });

            }
        }

   }
});