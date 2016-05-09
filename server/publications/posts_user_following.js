/**
 * Created by CristoH on 24/04/2016.
 */

Meteor.publishComposite('postsUserFollowing', function(userId, limit) {
    check(userId, String);

    var user = Meteor.users.findOne({_id: userId});

    return {
        find: function() {
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
                find: function(post) {
                    return Meteor.users.find({_id: post.userId}, {fields: {
                        profile:1,
                        username:1
                    }});
                }
            }

        ]
    };

});