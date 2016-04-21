/**
 * Created by CristoH on 21/04/2016.
 */

Meteor.publishComposite('userProfile', function(userId) {
    check(userId, String);
    return {
        find: function() {
            return Meteor.users.find({_id: userId}, {fields: {
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
                        });
                    }else{
                        return Posts.find({userId: user._id});
                    }
                }
            }

        ]
    };
});