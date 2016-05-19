/**
 * Created by CristoH on 28/04/2016.
 */

Template.allNotifications.helpers({
   notifications: function(){
       return Notifications.find({alertedUserId: Meteor.userId()},{sort:{createdAt: -1}});
   }
});

Template.notificationItemRead.helpers({
    notificationPath: function() {
        if(this.action == "comment" || this.action == "like"){
            return Router.routes.postPage.path({_id: this.contentId, slug: this.contentSlug});
        }
    },
    userImage: function(){
        var user = Meteor.users.findOne({_id: this.userId});
        if(user.profile.display_picture){
            return user.profile.display_picture;
        }else{
            return '/img/no-avatar.jpg';
        }
    },
    notViewed: function(){
        if(this.read == false){
            return 'notViewed';
        }
    }
});
Template.notificationItemRead.events({
    'click .delete': function(e) {
        e.preventDefault();
        var notificationID = this._id;
        var alertedUserId = this.alertedUserId;
        swal({
            title: '¿Estás seguro?',
            text: 'La notificación no se podra recuperar',
            type: 'warning',
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Elimínalo!",
            cancelButtonText: "No, pls!",
            showCancelButton: true
        }, function(){
            Meteor.call('deleteNotification', notificationID, alertedUserId);
        });

    },
    'click .postRoute, click .read-notification': function() {
        Notifications.update(this._id, {$set: {read: true}});
    }
});