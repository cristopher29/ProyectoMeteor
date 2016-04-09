/**
 * Created by CristoH on 20/03/2016.
 */

Notifications = new Mongo.Collection('notifications');

Notifications.allow({
    update: function(userId, doc, fields) {
        return ownsNotification(userId, doc) &&
            fields.length === 1 && fields[0] === 'read';
    }
});

