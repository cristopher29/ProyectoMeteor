/**
 * Created by CristoH on 24/04/2016.
 */

Meteor.publishComposite('postsUserFollowing', function(userId, limit) {

    return {
        find: function() {

            var user = Meteor.users.findOne({_id: userId});

            if (user.following) {
                return Posts.find({ userId: { $in: user.following } }, {sort:{createdAt: -1},limit: limit});
            }
        },
        children: [
            {
                find: function(post) {
                    return Meteor.users.find({_id: post.userId}, {fields: {
                        profile:1,
                        username:1,
                        followers:1,
                        followersCount:1,
                        following:1,
                        followingCount:1,
                        postsCount: 1
                    }});
                }
            }

        ]
    };

});