/**
 * Created by CristoH on 10/03/2016.
 */


Meteor.methods({
    commentInsert: function(commentAttributes, postAttributes) {

        check(Meteor.userId(), String);
        check(commentAttributes, Comments.simpleSchema());

        var user = Meteor.user();
        var post = Posts.findOne(postAttributes._id);

        if (!post){
            throw new Meteor.Error('invalid-comment', 'Debes comentar en un post');
        }
        var comment = _.extend(commentAttributes, {
            userId: user._id,
            author: user.username,
            createdAt: new Date()
        });

        return Comments.insert(comment);
    }
});