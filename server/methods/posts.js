/**
 * Created by CristoH on 10/03/2016.
 */

Meteor.methods({

    postInsert: function(postAttributes) {

        check(Meteor.userId(), String);
        check(postAttributes, Posts.simpleSchema());

        var postExists = Posts.findOne({title: postAttributes.title, description: postAttributes.description});

        if (postExists) {
            return {
                postExists: true
            }
        }

        var user = Meteor.user();
        var post = _.extend(postAttributes, {
            userId: user._id,
            author: user.username,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        var postId = Posts.insert(post);


        return {

            _id: postId

        }
    },

    postUpdate: function(postId, newValues, oldValues){

        check(Meteor.userId(), String);
        check(newValues, Posts.simpleSchema());


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
            userId: user._id,
            author: user.username,
            updatedAt: new Date()
        });


        Posts.update(postId, {$set: post});
        return {

            _id: postId

        }


    }
});