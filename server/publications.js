/**
 * Created by CristoH on 10/01/2016.
 */
Meteor.publish('posts', function() {
    return Posts.find();
});