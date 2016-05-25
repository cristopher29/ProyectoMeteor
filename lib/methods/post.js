/**
 * Created by CristoH on 11/05/2016.
 */

Meteor.methods({

    postDislike: function(postId, userId){

        check(Meteor.userId(), String);

        var post = Posts.findOne({_id: postId});

        if(post.usersLiked.indexOf(userId) >= 0){

            Posts.update({_id: postId}, {$pull: {usersLiked: userId}, $inc:{likesCount: -1}});
            return {
                dislike : true
            }

        }else{
            return null;
        }

    },

    postLike: function(postId, userId){

        check(Meteor.userId(), String);

        var post = Posts.findOne({_id: postId});

        if(post.usersLiked.indexOf(userId) == -1){
            if(post.userId == Meteor.userId()){
                Posts.update({_id: postId}, {$push: {usersLiked: userId}, $inc:{likesCount: 1}});
                return {
                    selfLike: true
                };
            }else{
                Posts.update({_id: postId}, {$push: {usersLiked: userId}, $inc:{likesCount: 1}});
                Meteor.call('createNotification', post.userId, post._id, post.slug, post.title, Meteor.userId(), Meteor.user().username, "like");
                return {
                    likeNotification: true
                };
            }
        }else{
            return null;
        }

    }

});