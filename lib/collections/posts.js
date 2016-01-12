/**
 * Created by CristoH on 04/01/2016.
 */
Posts = new Mongo.Collection('posts');

Meteor.methods({
    postInsert: function(postAttributes) {

        var postWithSameLink = Posts.findOne({url: postAttributes.url});
        var url = postAttributes.url;

        if (postWithSameLink) {
            return {
                postExists: true,
                _id: postWithSameLink._id
            }
        }

        if(!url.match(/^http([s]?):\/\/.*/)){
            return {
                noTieneHTTP: true
            }
        }

        var user = Meteor.user();
        var post = _.extend(postAttributes, {
            userId: user._id,
            author: user.username,
            submitted: new Date()
        });
        var postId = Posts.insert(post);
        return {
            _id: postId
        };
    }
});