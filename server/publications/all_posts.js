/**
 * Created by CristoH on 22/04/2016.
 */

Meteor.publish('allPosts', function() {
    return Posts.find();
});