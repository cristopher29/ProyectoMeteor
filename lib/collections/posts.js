/**
 * Created by CristoH on 04/01/2016.
 */
Posts = new Mongo.Collection('posts');

//if (Meteor.isServer) {
//    Posts._ensureIndex({
//        "title": "text",
//        "shortDescription": "text"
//    });
//}

PostsIndex = new EasySearch.Index({
    collection: Posts,
    fields: ['title', 'shortDescription'],
    engine: new EasySearch.MongoDB({
        sort: function () {
            return { score: -1 };
        }
    }),
    defaultSearchOptions: {
        limit: 3
    }
});

PostSchema = new SimpleSchema({
    title: {
        type: String,
        label: i18n('postForm.titleField'),
        max: 20,
        autoform: {
            afFieldInput: {
                type: "text"
            }
        }
    },
    shortDescription:{
        type: String,
        label: i18n('postForm.shortDescriptionField'),
        max: 150,
        autoform:{
            afFieldInput:{
                type: "text"
            }
        }
    },
    youtubeUrl:{
        type: String,
        optional: true,
        label: i18n('postForm.youtubeField'),
        regEx: /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/,
        autoform:{
            placeholder: "https://www.youtube.com/watch?v=HUngLgGRJpo",
            afFieldInput:{
                type: "url"
            }
        }
    },
    image:{
        type: String,
        label: i18n('postForm.imageField'),
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
        label: i18n('postForm.descriptionField'),
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
    maxString: "[label] no puede contener mas de [max] caracteres",
    regEx: [
        {msg: "Debes ingresar una url válida"}
    ]
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