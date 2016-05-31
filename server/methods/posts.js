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