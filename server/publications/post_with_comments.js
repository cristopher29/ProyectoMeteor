/**
 * Created by CristoH on 22/04/2016.
 */

//Meteor.publish('postWithComments', function(postId) {
//    return Posts.find({_id: postId});
//});

Meteor.publishComposite('postWithComments', function(postId) {
    check(postId, String);
    return {
        find: function() {
            return Posts.find({_id: postId});
        },
        children: [{
            find: function(post){
                return Comments.find({postId: post._id});
            },
            children: [{
                find: function(comment,post){
                    return Meteor.users.find({_id: comment.userId},{fields:{profile:1}});
                }
            }]
        }]
    };

});