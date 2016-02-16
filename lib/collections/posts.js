/**
 * Created by CristoH on 04/01/2016.
 */
Posts = new Mongo.Collection('posts');

Posts.allow({
    update: function(userId, post) {
        return ownsDocument(userId, post);
    },
    remove: function(userId, post) {
        return ownsDocument(userId, post);
    }
});

Posts.deny({  update: function(userId, post, fieldNames) {
        // solo podra editar estos 2 campos
        return (_.without(fieldNames, 'url', 'title').length > 0);
    }
});