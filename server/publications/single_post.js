/**
 * Created by CristoH on 22/04/2016.
 */

Meteor.publish('singlePost', function(postId) {
    return Posts.find({_id: postId});
});