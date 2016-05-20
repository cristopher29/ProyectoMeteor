/**
 * Created by CristoH on 19/05/2016.
 */


Meteor.publishComposite('postsTrending', function(limit) {
    return {
        find: function() {
            return Posts.find({}, {sort: {likesCount: -1, commentsCount: -1}, limit: limit});
        },
        children: [{
            find: function(post){
                return Meteor.users.find({_id: post.userId}, {fields: {
                    profile:1,
                    username:1
                }});
            }
        }]
    };

});