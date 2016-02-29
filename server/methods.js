/**
 * Created by CristoH on 16/02/2016.
 */
Meteor.methods({

    postInsert: function(postAttributes) {

        check(Meteor.userId(), String);
        check(postAttributes, Posts.simpleSchema());

        var d = new Date();
        var datestring = d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear() + " " +
            d.getHours() + ":" + (d.getMinutes()<10?'0':'') + d.getMinutes();

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
            createdAt: datestring,
            updatedAt: datestring
        });

        var postId = Posts.insert(post);


        return {

            _id: postId

        }
    },

    postUpdate: function(postId, newValues, oldValues){

        check(Meteor.userId(), String);
        check(newValues, PostSchema);

        var d = new Date();
        var datestring = d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear() + " " +
            d.getHours() + ":" + (d.getMinutes()<10?'0':'') + d.getMinutes();

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
            updatedAt: datestring
        });


        Posts.update(postId, {$set: post});
        return {

            _id: postId

        }


    }
});