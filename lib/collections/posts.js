/**
 * Created by CristoH on 04/01/2016.
 */
Posts = new Mongo.Collection('posts');

Posts.allow({
    update: function(userId, post) {
        return ownsDocument(userId, post);
    },
    remove: function(userId, post) {
        return ownsDocument(userId, post);
    }
});

Posts.deny({  update: function(userId, post, fieldNames) {
        // solo podra editar estos 2 campos
        return (_.without(fieldNames, 'url', 'title').length > 0);
    }
});

Meteor.methods({
    postInsert: function(postAttributes) {

        check(Meteor.userId(), String);
        check(postAttributes, {
            title: String,
            url: String
        });

        var postWithSameLink = Posts.findOne({url: postAttributes.url});
        var url = postAttributes.url;

        if (postWithSameLink) {
            return {
                postExists: true,
                _id: postWithSameLink._id
            }
        }

        var user = Meteor.user();
        var post = _.extend(postAttributes, {
            userId: user._id,
            author: user.username,
            submitted: new Date()
        });

        if(/^(http|https|ftp):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i.test(url)){

            var postId = Posts.insert(post);
            return {

                _id: postId

            }
        } else {
            return {
                urlNoValida: true
            }
        }
    },
    postUpdate: function(oldPost, newValues, oldPostURL){

        check(Meteor.userId(), String);
        check(newValues, {
            title: String,
            url: String
        });

        var url = newValues.url;

        if(oldPostURL != newValues.url){

            var postWithSameLink = Posts.findOne({url: newValues.url});

            if (postWithSameLink) {
                return {
                    postExists: true,
                    _id: postWithSameLink._id
                }
            }

        }


        var user = Meteor.user();
        var post = _.extend(newValues, {
            title: newValues.title,
            userId: user._id,
            author: user.username,
            updated: new Date()
        });

        if(/^(http|https|ftp):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i.test(url)){

            Posts.update(oldPost, {$set: post});
            return {

                _id: oldPost

            }
        } else {
            return {
                urlNoValida: true
            }
        }

    }
});