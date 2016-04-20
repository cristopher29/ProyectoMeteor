/**
 * Created by CristoH on 10/01/2016.
 */

//test
Meteor.publish('posts', function() {
    return Posts.find();
});

Meteor.publish('comments', function(postId) {
    check(postId, String);
    return Comments.find({postId: postId});
});

Meteor.publish('userProfile', function(userId) {
    check(userId, String);
    return Meteor.users.find({_id: userId}, {fields:{
        profile: 1,
        username: 1,
        followersCount: 1,
        followingCount: 1,
        followers:1,
        following:1
    }});
});

