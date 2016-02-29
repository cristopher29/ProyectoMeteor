/**
 * Created by CristoH on 04/01/2016.
 */
Posts = new Mongo.Collection('posts');

PostSchema = new SimpleSchema({
    title: {
        type: String,
        label: "Título",
        max: 20,
        autoform: {
            afFieldInput: {
                type: "text"
            }
        }
    },
    description:{
        type: String,
        label: "Descripción",
        max: 200,
        autoform: {
            afFieldInput: {
                type: "textarea",
                rows: 5
            }
        }
    },
    userId:{
        type: String,
        autoform: {
            type: 'hidden'
        },
        optional: true
    },
    author:{
        type: String,
        autoform: {
            type: 'hidden'
        },
        optional: true
    },
    createdAt:{
        type: String,
        autoform: {
            type: 'hidden'
        },
        optional: true
    },
    updatedAt:{
        type: String,
        autoform: {
            type: 'hidden'
        },
        optional: true
    }
});

Posts.attachSchema(PostSchema, {transform: true});

PostSchema.messages({
    required: "[label] esta vacio",
    maxString: "[label] no puede contener mas de [max] caracteres"
});

Posts.allow({
    update: function(userId, post) {
        return ownsDocument(userId, post);
    },
    remove: function(userId, post) {
        return ownsDocument(userId, post);
    }
});

Posts.deny({  update: function(userId, post, fieldNames) {
        // Por defecto devuelve FALSE (0>0), pero si hay mas campos devuelve TRUE, con lo que el DENY se cumple.
        return (_.without(fieldNames, 'title', 'description').length > 0);
    }
});