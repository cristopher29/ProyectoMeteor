/**
 * Created by CristoH on 22/04/2016.
 */

//Meteor.publish('allPosts', function() {
//    return Posts.find();
//});

Meteor.publishComposite('allPosts', function(limit) {

    return {
        find: function() {
            return Posts.find({}, {limit: limit, sort: {createdAt: -1}});
        },
        children: [{
            find: function(post){
                return Meteor.users.find({_id: post.userId}, {fields: {
                    profile:1,
                    username:1,
                    followersCount: 1,
                    followingCount: 1,
                    postsCount: 1
                }});
            }
        }]
    };

});