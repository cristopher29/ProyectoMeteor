/**
 * Created by CristoH on 19/04/2016.
 */

Meteor.publish('notifications', function() {
    return Notifications.find({
        alertedUserId: this.userId
    },{sort: {createdAt: -1}});
});
