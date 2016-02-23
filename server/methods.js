/**
 * Created by CristoH on 16/02/2016.
 */
Meteor.methods({
    postInsert: function(postAttributes) {

        check(Meteor.userId(), String);
        check(postAttributes, PostSchema);

        var postWithSameAttr = Posts.findOne({title: postAttributes.title}, {description: postAttributes.description});

        if (postWithSameAttr) {
            return {
                postExists: true,
                _id: postWithSameAttr._id
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

        }
    },
    postUpdate: function(oldPost, newValues, oldValues){

        check(Meteor.userId(), String);
        check(newValues, PostSchema);

        if(oldValues.title != newValues.title || oldValues.description != newValues.description){

            var postWithSameAttr = Posts.findOne({title: newValues.title, description: newValues.description});

            if (postWithSameAttr) {
                return {
                    postExists: true
                }
            }

        }

        var user = Meteor.user();
        var post = _.extend(newValues, {
            title: newValues.title,
            description: newValues.description,
            shortDescription: newValues.shortDescription,
            userId: user._id,
            author: user.username,
            updated: new Date()
        });


        Posts.update(oldPost, {$set: post});
        return {

            _id: oldPost

        }


    }
});