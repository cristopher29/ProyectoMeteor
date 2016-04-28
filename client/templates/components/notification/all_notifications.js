/**
 * Created by CristoH on 28/04/2016.
 */

Template.allNotifications.helpers({
   notifications: function(){
       return Notifications.find({alertedUserId: Meteor.userId(), read: true},{sort:{createdAt: -1}});
   }
});

Template.notificationItemRead.helpers({
    notificationPath: function() {
        if(this.action == "comment" || this.action == "like"){
            return Router.routes.postPage.path({_id: this.contentId, slug: this.contentSlug});
        }
    }
});
Template.notificationItemRead.events({
    'click .delete': function() {
        Meteor.call('deleteNotification', this._id, this.alertedUserId);
    }
});