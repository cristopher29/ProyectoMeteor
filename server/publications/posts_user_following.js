/**
 * Created by CristoH on 24/04/2016.
 */

Meteor.publishComposite('postsUserFollowing', function(userId, limit) {
    check(userId, String);

    var user = Meteor.users.findOne({_id: userId});

    return {
        find: function() {
            if (user.following) {
                return Posts.find({ userId: { $in: user.following } }, {sort:{createdAt: -1},limit: limit});
            }else{
                this.ready();
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