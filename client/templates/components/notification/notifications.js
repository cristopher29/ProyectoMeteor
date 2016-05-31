/**
 * Created by CristoH on 20/03/2016.
 */

Template.registerHelper('actionToText', function(action){
    if(action == "comment"){
        return i18n('notifications.commented')
    }
    if(action == "like"){
        return i18n('notifications.liked')
    }
    if(action == "follow"){
        return i18n('notifications.followed')
    }
});

Template.notifications.helpers({
    notifications: function() {
        return Notifications.find({alertedUserId: Meteor.userId(), read: false});
    },
    notificationCount: function(){
        return Notifications.find({alertedUserId: Meteor.userId(), read: false}).count();
    }
});

Template.notificationItem.helpers({
    notificationPath: function() {
        if(this.action == "comment" || this.action == "like"){
            return Router.routes.postPage.path({_id: this.contentId, slug: this.contentSlug});
        }
    },
    userImage: function(){
        var user = Meteor.users.findOne({_id: this.userId});
        if(user.profile.display_picture === null){
            return '/img/no-avatar.jpg';
        }else{
            return user.profile.display_picture;
        }
    }
});

Template.notificationItem.events({
    'click .postRoute, click .read-notification': function() {
        Notifications.update(this._id, {$set: {read: true}});
    }
});