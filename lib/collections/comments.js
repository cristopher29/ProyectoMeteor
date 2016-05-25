/**
 * Created by CristoH on 10/03/2016.
 */

Comments = new Mongo.Collection('comments');

CommentSchema = new SimpleSchema({

   body: {
       type: String,
       label: 'Comentario',
       max: 200,
       autoform: {
           label: false,
           afFieldInput: {
               type: "textarea",
               rows: 4
           }
       }
   },
    postId: {
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
        type: Date,
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
    }
});

Comments.attachSchema(CommentSchema);

CommentSchema.messages({
    required: "[label] esta vacio",
    maxString: "[label] no puede contener mas de [max] caracteres"
});
