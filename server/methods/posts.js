/**
 * Created by CristoH on 10/03/2016.
 */

function sanitize(html){
    return sanitizeHtml(html, {
        allowedTags: [ 'b', 'i', 'u', 'strong', 'font','strike','span','div' ],
        allowedAttributes: {
            'font': [ 'color','style' ],
            'span': [ 'style' ],
            'div': [ 'style'],
            'b': ['style']
        }
    });
}


Meteor.methods({

    postInsert: function(postAttributes) {

        check(Meteor.userId(), String);
        check(postAttributes, Posts.simpleSchema());

        var dirtyHtml = postAttributes.description;
        var cleanHtml = sanitize(dirtyHtml);

        var text = cleanHtml.replace(/<[^>]*>/g, "");
        var textLength = text.length;

        var postExists = Posts.findOne({title: postAttributes.title, shortDescription: postAttributes.shortDescription, textDescription: text});

        if (postExists) {
            return {
                postExists: true
            }
        }
        if(textLength > 500){
            throw new Meteor.Error("over-limit", "Error limite descripcion");
        }

        var user = Meteor.user();
        var post = _.extend(postAttributes, {
            description: cleanHtml,
            textDescription: text,
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

        var dirtyHtml = newValues.description;
        var cleanHtml = sanitize(dirtyHtml);

        var text = cleanHtml.replace(/<[^>]*>/g, "");
        var textLength = text.length;

        if(oldValues.title != newValues.title || oldValues.textDescription != newValues.textDescription || oldValues.shortDescription != newValues.shortDescription){

            var postWithSameAttr = Posts.findOne({title: newValues.title, shortDescription: newValues.shortDescription, textDescription: text});

            if (postWithSameAttr) {
                return {
                    postExists: true
                }
            }

        }

        if(textLength > 500){
            throw new Meteor.Error("over-limit", "Error limite descripcion");
        }

        var user = Meteor.user();
        var post = _.extend(newValues, {
            title: newValues.title,
            shortDescription: newValues.shortDescription,
            description: cleanHtml,
            textDescription: text,
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