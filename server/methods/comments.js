/**
 * Created by CristoH on 10/03/2016.
 */


Meteor.methods({

    commentInsert: function(commentAttributes, postAttributes) {

        //Comprobamos que el post sea igual al esquema establecido
        check(commentAttributes, Comments.simpleSchema());

        //Comprobamos que el email de usuario este verificado
        if(Meteor.user().emails){
            if(!Meteor.user().emails[0].verified) {
                return {
                    emailNotVerified: true
                }
            }
        }

        //Obtenemos el usuario y el post
        var user = Meteor.user();
        var post = Posts.findOne(postAttributes._id);

        if (!post){
            throw new Meteor.Error('invalid-post', 'Debes comentar en un post');
        }

        //Agregamos los valores
        var comment = _.extend(commentAttributes, {
            userId: user._id,
            postId: postAttributes._id,
            author: user.username,
            createdAt: new Date()
        });

        //Insertamos el comentario y guardamos el id
        comment._id = Comments.insert(comment);

        Posts.update(comment.postId, {$inc: {commentsCount: 1}});

        Meteor.call('createNotification', post.userId, post._id, post.slug, post.title, comment.userId, comment.author, "comment");

        return comment._id;
    },
    commentUpdate: function(commentId, commentBody){

        if(commentBody.length > 200){
            throw new Meteor.Error('comment-limit', 'El límite es de 200 caracteres');
        }

        var comment = Comments.findOne({_id: commentId});

        if(comment && Meteor.userId() === comment.userId){
            Comments.update({_id: commentId},{$set:{body: commentBody}});
            return true;
        }else {
            throw new Meteor.Error('comment-update', 'Error al actualizar el comentario');
        }
    },
    commentDelete: function(commentId){

        var comment = Comments.findOne({_id: commentId});

        if(comment && Meteor.userId() === comment.userId){
            Posts.update(comment.postId, {$inc: {commentsCount: -1}});
            Comments.remove(comment._id);
            return true;
        }else {
            throw new Meteor.Error('comment-delete', 'Error al eliminar el comentario');
        }
    },
    commentLike: function(commentId, userId){

        if(!Meteor.userId()){
            throw new Meteor.Error('no-login', 'Error, Inicia sesión')
        }

        var comment = Comments.findOne({_id: commentId});

        if(comment.usersLiked){
            if(comment.usersLiked.indexOf(userId) == -1){
                Comments.update({_id: commentId}, {$inc: {likesCount: 1}, $push: {usersLiked: userId}});
                return {
                    likeComment: true
                }
            }else{
                throw new Meteor.Error('error-comment-like', 'Ya has votado este comentario');
            }
        }else {
            Comments.update({_id: commentId}, {$inc: {likesCount: 1}, $push: {usersLiked: userId}});
            return {
                likeComment: true
            }
        }
    },
    commentDislike: function(commentId, userId){

        if(!Meteor.userId()){
            throw new Meteor.Error('no-login', 'Error, Inicia sesión')
        }

        var comment = Comments.findOne({_id: commentId});

        if(comment.usersLiked.indexOf(userId) >= 0){

            Comments.update({_id: commentId}, {$pull: {usersLiked: userId}, $inc:{likesCount: -1}});
            return {
                dislike : true
            }

        }else{
            return null;
        }

    }
});