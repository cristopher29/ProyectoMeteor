/**
 * Created by CristoH on 10/01/2016.
 */

Meteor.publish('comments', function(postId) {
    check(postId, String);
    return Comments.find({postId: postId});
});

