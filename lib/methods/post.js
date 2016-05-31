/**
 * Created by CristoH on 11/05/2016.
 */

Meteor.methods({

    postUpdate: function(newValues, oldValues){

        check(Meteor.userId(), String);
        check(newValues, Posts.simpleSchema());

        //Comprobamos que sea el autor del post
        if(Meteor.userId() !== oldValues.userId){
            throw new Meteor.Error("invalid-author", "No eres el autor del post");
        }

        //Limpiamos el html
        var dirtyHtml = newValues.description;
        var cleanHtml = sanitize(dirtyHtml);

        //Obtenemos solo el texto
        var text = cleanHtml.replace(/<[^>]*>/g, "");

        //Si ha modificado alguno de estos valores entramos
        if(oldValues.title != newValues.title || oldValues.textDescription != text || oldValues.shortDescription != newValues.shortDescription){

            //Buscamos un post con los mismo valores
            var postWithSameAttr = Posts.findOne({title: newValues.title, shortDescription: newValues.shortDescription, textDescription: text});

            //Si existe devolvemos "postExist"
            if (postWithSameAttr) {
                return {
                    postExists: true
                }
            }

        }

        //Actualizamos los valores
        var post = _.extend(newValues, {
            title: newValues.title,
            shortDescription: newValues.shortDescription,
            youtubeUrl: newValues.youtubeUrl,
            description: cleanHtml,
            textDescription: text,
            updatedAt: new Date()
        });

        //Actualizamos el post
        Posts.update(oldValues._id, {$set: post});

        var res = Posts.findOne(oldValues._id);
        var notifications = Notifications.find({contentId: res._id, read: false}).fetch();

        if(notifications){
            notifications.forEach(function(notification){
                notification.contentSlug = res.slug;
                notification.contentTitle = res.title;
                Notifications.update(notification._id, notification);
            })
        }
        //Devolvemos el id
        return {
            slug: res.slug,
            _id: res._id

        }
    },

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