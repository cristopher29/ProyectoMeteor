/**
 * Created by CristoH on 10/03/2016.
 */


Meteor.methods({

    commentInsert: function(commentAttributes, postAttributes) {

        //Comprobamos que el email de usuario este verificado
        if(!Meteor.user().emails[0].verified) {
            return {
                emailNotVerified: true
            }
        }

        check(Meteor.userId(), String);
        //Comprobamos que el post sea igual al esquema establecido
        check(commentAttributes, Comments.simpleSchema());

        //Obtenemos el usuario y el post
        var user = Meteor.user();
        var post = Posts.findOne(postAttributes._id);

        if (!post){
            throw new Meteor.Error('invalid-comment', 'Debes comentar en un post');
        }

        //Agregamos los valores
        var comment = _.extend(commentAttributes, {
            userId: user._id,
            postId: postAttributes._id,
            author: user.username,
            postSlug: postAttributes.slug,
            createdAt: new Date()
        });

        //Insertamos el comentario y guardamos el id
        comment._id = Comments.insert(comment);

        Posts.update(comment.postId, {$inc: {commentsCount: 1}});

        Meteor.call('createNotification', post.userId, post._id, post.title, comment.userId, comment.author, "comment");


        return comment._id;
    }
});