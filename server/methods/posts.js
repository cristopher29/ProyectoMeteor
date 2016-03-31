/**
 * Created by CristoH on 10/03/2016.
 */


// Funcion para sanitizar el html

function sanitize(html){
    return sanitizeHtml(html, {
        allowedTags: [ 'b', 'i', 'u', 'strong', 'font','strike','span','div' ],
        allowedAttributes: {
            '*': [ 'color','style' ]
        }
    });
}


Meteor.methods({

    postLike: function(postId, userId){
        check(Meteor.userId(), String);

        if (userId != Meteor.userId()) {
            throw new Meteor.Error('invalid-id', 'userId no es igual');
        }

        var post = Posts.findOne({_id: postId});

        if(post.usersLiked.indexOf(userId) > -1){
            Posts.update({_id: postId}, {$pull: {usersLiked: userId}, $inc:{likesCount: -1}});
            return {
                unlike: true
            }
        }else if(post.usersLiked.indexOf(userId) == -1){
            Posts.update({_id: postId}, {$push: {usersLiked: userId}, $inc:{likesCount: 1}});
            Meteor.call('createNotification', post.userId, post._id, post.title, userId, Meteor.user().username, "like");
            return {
                like: true
            }
        }
    },

    postInsert: function(postAttributes) {

        check(Meteor.userId(), String);
        //Comprobamos que el post tenga los campos obligatorios del esquema
        check(postAttributes, Posts.simpleSchema());

        //Limpiamos el html
        var dirtyHtml = postAttributes.description;
        var cleanHtml = sanitize(dirtyHtml);

        //Obtenemos solo el texto
        var text = cleanHtml.replace(/<[^>]*>/g, "");
        var textLength = text.length;

        //Comprobamos si existe el post con los mismo atributos
        var postExists = Posts.findOne({title: postAttributes.title, shortDescription: postAttributes.shortDescription, textDescription: text});

        if (postExists) {
            return {
                postExists: true
            }
        }

        //Comprobamos la longitud del texto
        if(textLength > 500){
            throw new Meteor.Error("over-limit", "Error limite descripcion");
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

        var res = Posts.findOne({_id:post._id});

        //Devolvemos el id
        return {

            slug: res.slug

        }
    },

    postUpdate: function(newValues, oldValues){

        //Comprobamos que sea el autor del post
        if(Meteor.userId() !== oldValues.userId){
            throw new Meteor.Error("no-author", "No eres el autor del post");
        }

        check(Meteor.userId(), String);

        check(PostSchema.clean(newValues), Posts.simpleSchema());

        //Limpiamos el html
        var dirtyHtml = newValues.description;
        var cleanHtml = sanitize(dirtyHtml);

        //Obtenemos solo el texto
        var text = cleanHtml.replace(/<[^>]*>/g, "");
        var textLength = text.length;

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

        //Comprobamos la longitud del texto
        if(textLength > 500){
            throw new Meteor.Error("over-limit", "Error limite descripcion");
        }

        //Actualizamos los valores

        var post = _.extend(newValues, {
            title: newValues.title,
            shortDescription: newValues.shortDescription,
            description: cleanHtml,
            textDescription: text,
            updatedAt: new Date()
        });

        //Actualizamos el post
        Posts.update(oldValues._id, {$set: post});
        Comments.update({postId: oldValues._id},{$set: {postSlug: post.slug}});

        //Devolvemos el id
        return {

            slug: post.slug

        }


    }
});