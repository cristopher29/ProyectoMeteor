/**
 * Created by CristoH on 19/04/2016.
 */


Meteor.publishComposite('userFollowers', function(userId) {
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
                    if (user.followers) {
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