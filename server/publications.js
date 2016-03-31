/**
 * Created by CristoH on 10/01/2016.
 */
Meteor.publish('posts', function() {
    return Posts.find();
});

Meteor.publish('comments', function(postSlug) {
    check(postSlug, String);
    return Comments.find({postSlug: postSlug});
});

Meteor.publish('notifications', function() {
    return Notifications.find({alertedUserId: this.userId, read: false});
});

Meteor.publish('user-profile', function(userId) {
    check(userId, String);
    return Meteor.users.find({_id: userId}, {fields:{
        "profile": 1,
        "username": 1
    }});
});

