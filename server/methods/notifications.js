/**
 * Created by CristoH on 27/03/2016.
 */

Meteor.methods({

    deleteNotification: function(notificationId, alertedUserId){
        if(alertedUserId === Meteor.userId()){
            Notifications.remove(notificationId);
        }
    },
    createNotification: function(alertedUserId, contentId, contentSlug, contentTitle, userId, username , action){

        //Si el usuario alertado es el mismo que creo la notificacion
        if (alertedUserId === userId) {
            return null; // No va a pasar nada
        }

        //Comprobamos si la notificacion ya existe
        var notificationExist = Notifications.findOne({alertedUserId: alertedUserId, contentId: contentId, userId: userId, action: action});

        //Si es un comentario actualizamos para que se vuelva a mostrar
        if(notificationExist && action == "comment"){
            Notifications.update({_id: notificationExist._id}, {$set: {read : false} });
            Notifications.update({_id: notificationExist._id}, {$set: {createdAt : new Date()} });
        }else if(notificationExist && action == "like"){
            return null;
        }else if(notificationExist && action == "follow"){
            return null;
        }else{

            //Comprobamos que los usuarios existan
            if(userId === Meteor.userId() && checkUser(alertedUserId)){
                //Creamos la notificacion!
                var notificationId = Notifications.insert({
                    alertedUserId: alertedUserId,
                    contentId: contentId,
                    contentSlug: contentSlug,
                    contentTitle: contentTitle,
                    userId: userId,
                    username: username,
                    action: action,
                    createdAt: new Date(),
                    read: false
                });

                return notificationId;
            }else{
                throw new Meteor.Error("not-user", "El usuario no existe");
            }
        }
    }
});