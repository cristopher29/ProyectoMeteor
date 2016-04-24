/**
 * Created by CristoH on 24/04/2016.
 */

Meteor.publishComposite('userTimeline', function(userId, limit) {
    check(userId, String);
    return {
        find: function() {
            return Meteor.users.find({_id: userId}, {limit: 1, fields: {
                username:1,
                profile:1,
                followers:1,
                followersCount:1,
                following:1,
                followingCount:1
            }});
        },
        children: [
            {
                find: function(user) {
                    if (user.following) {
                        return Posts.find({ $or:
                            [
                                { userId: { $in: user.following } },
                                { userId: user._id }
                            ]
                        }, {limit: limit});
                    }else{
                        return Posts.find({userId: user._id}, {limit: limit});
                    }
                },
                children: [
                    {
                        find: function(post, user) {
                            return Meteor.users.find({_id: post.userId}, {fields: {
                                profile:1
                            }});
                        }
                    }

                ]
            }

        ]
    };
});