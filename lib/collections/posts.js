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
    image:{
        type: String,
        label: 'Imagen',
        autoform: {
            afFieldInput: {
                type: 'file'
            }
        },
        optional: true
    },
    imageId:{
        type: String,
        optional: true
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
    commentsCount:{
        type: Number,
        autoform: {
            type: 'hidden'
        },
        optional: true
    },
    usersLiked:{
        type: [String],
        autoform: {
            type: 'hidden'
        },
        optional: true
    },
    likesCount:{
        type: Number,
        autoform: {
            type: 'hidden'
        },
        optional: true
    },
    createdAt:{
        type: Date,
        autoform: {
            type: 'hidden'
        },
        optional: true
    },
    updatedAt:{
        type: Date,
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


var whiteList = ['image', 'imageId'];

Posts.allow({

    update: function(userId, post, fields){
        if(_.difference(fields, whiteList).length === 0){
            return ownsDocument(userId, post);
        }else{
            return false;
        }
    }
});

Posts.friendlySlugs({
    slugFrom: 'title',
    slugField: 'slug',
    distinct: true,
    updateSlug: true
});