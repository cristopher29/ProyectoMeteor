/**
 * Created by CristoH on 24/04/2016.
 */

Meteor.publishComposite('postsUserFollowing', function(userFollowing, limit) {

    return {
        find: function() {

            if (userFollowing) {
                return Posts.find({ userId: { $in: userFollowing } }, {sort:{createdAt: -1},limit: limit});
            }else{
                this.ready();
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