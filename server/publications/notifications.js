/**
 * Created by CristoH on 19/04/2016.
 */

//Meteor.publish('notifications', function() {
//    return Notifications.find({
//        alertedUserId: this.userId
//    },{sort: {createdAt: -1}});
//});

Meteor.publishComposite('notifications', function() {

    return {
        find: function() {
            return Notifications.find({alertedUserId: this.userId},{sort: {createdAt: -1}});
        },
        children: [{
            find: function(notification){
                return Meteor.users.find({_id: notification.userId}, {fields: {
                    profile:1,
                    username:1
                }});
            }
        }]
    };

});