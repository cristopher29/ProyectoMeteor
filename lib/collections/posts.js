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
    shortDescription:{
        type: String,
        label: "Descripción corta",
        max: 150,
        autoform:{
            afFieldInput:{
                type: "text"
            }
        }
    },
    description:{
        type: String,
        label: "Descripción",
        autoform: {
            afFieldInput: {
                type: "summernote",
                class: "summernote form-control",
                settings: {
                    height: 300,
                    toolbar: [
                        ['style', ['bold', 'italic', 'underline', 'clear']],
                        ['font', ['strikethrough']],
                        ['fontsize', ['fontsize']],
                        ['color', ['color']],
                        ['para', ['paragraph']]
                    ]
                }
            }
        }
    },
    textDescription:{
        type: String,
        autoform: {
            type: 'hidden'
        },
        optional: true
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

Posts.attachSchema(PostSchema);

PostSchema.messages({
    required: "[label] esta vacio",
    maxString: "[label] no puede contener mas de [max] caracteres"
});

Posts.allow({
    update: function(userId, post){
        return ownsDocument(userId, post);
    },
    remove: function(userId, post) {
        return ownsDocument(userId, post);
    }
});