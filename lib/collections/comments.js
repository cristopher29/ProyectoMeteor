/**
 * Created by CristoH on 10/03/2016.
 */

Comments = new Mongo.Collection('comments');

CommentSchema = new SimpleSchema({

   body: {
       type: String,
       label: 'Comentar',
       max: 200,
       autoform: {
           afFieldInput: {
               type: "textarea",
               rows: 5
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
        type: String,
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

Comments.allow({
    remove: function(userId, post) {
        return ownsDocument(userId, post);
    }
});