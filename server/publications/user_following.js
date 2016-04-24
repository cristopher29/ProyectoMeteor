/**
 * Created by CristoH on 23/04/2016.
 */

Meteor.publishComposite('userFollowing', function(userId) {
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
                        return Meteor.users.find({_id: {$in: user.followers}}, {fields: {
                            username:1,
                            profile:1,
                            followersCount:1,
                            followingCount:1
                        }});
                    }
                }
            }

        ]
    };

});