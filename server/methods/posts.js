/**
 * Created by CristoH on 10/03/2016.
 */

Meteor.methods({

    postInsert: function(postAttributes) {

        check(Meteor.userId(), String);

        //Comprobamos que el post tenga los campos obligatorios del esquema
        check(postAttributes, Posts.simpleSchema());

        //Limpiamos el html
        var dirtyHtml = postAttributes.description;
        var cleanHtml = sanitize(dirtyHtml);

        //Obtenemos solo el texto
        var text = cleanHtml.replace(/<[^>]*>/g, "");

        //Comprobamos si existe el post con los mismo atributos
        var postExists = Posts.findOne({title: postAttributes.title, shortDescription: postAttributes.shortDescription, textDescription: text});

        if (postExists) {
            return {
                postExists: true
            }
        }

        //Agregamos los valores
        var user = Meteor.user();
        var post = _.extend(postAttributes, {
            description: cleanHtml,
            textDescription: text,
            userId: user._id,
            author: user.username,
            commentsCount: 0,
            usersLiked: [],
            likesCount: 0,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        //Insertamos el post
        post._id = Posts.insert(post);

        var res = Posts.findOne(post._id);
        Meteor.users.update({_id: res.userId}, {$inc:{postsCount: 1}});

        //Devolvemos el id y slug
        return {
            slug: res.slug,
            _id: res._id

        }
    },

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
    postDelete: function(userId, postId){

        check(userId, String);
        check(postId, String);

        if(Meteor.userId() === userId){
            Posts.remove({_id: postId});
            Comments.remove({postId: postId});
            var user = Meteor.users.findOne({_id: userId});
            if(user.postsCount >= 1){
                Meteor.users.update({_id: userId}, {$inc:{postsCount: -1}});
            }
        }
    }
});