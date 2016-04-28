/**
 * Created by CristoH on 21/04/2016.
 */

Meteor.publishComposite('userProfile', function(userId, limit) {
    check(userId, String);
    return {
        find: function() {
            return Meteor.users.find({_id: userId}, {fields: {
                username:1,
                profile:1,
                followers:1,
                followersCount:1,
                following:1,
                followingCount:1,
                postsCount: 1
            }});
        },
        children: [
            {
                find: function(user) {
                    if(limit){
                        return Posts.find({userId: user._id}, {limit: limit, sort:{createdAt: -1}});
                    }
                }
            }

        ]
    };
});