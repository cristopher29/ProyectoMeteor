/**
 * Created by CristoH on 20/03/2016.
 */

Template.registerHelper('actionToText', function(action){
    if(action == "comment"){
        return "ha comentado"
    }
    if(action == "like"){
        return "le ha gustado"
    }
    if(action == "follow"){
        return "te ha seguido"
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
            var res = Posts.findOne({_id: this.contentId});
            return Router.routes.postPage.path({slug: res.slug});
        }

    }
});

Template.notificationItem.events({
    'click .postRoute': function() {
        Notifications.update(this._id, {$set: {read: true}});
    }
});