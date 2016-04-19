/**
 * Created by CristoH on 27/03/2016.
 */

Meteor.methods({

    createNotification: function(alertedUserId, contentId, contentTitle, userId, username , action){

        console.log('creando Notificacion');
        //Si el usuario alertado es el mismo que creo la notificacion
        if (alertedUserId === userId) {
            return null; // Nada va a pasar
        }

        //Comprobamos que los usuarios existan
        if(userId === Meteor.userId() && checkUser(alertedUserId)){

            //Comprobamos si la notificacion ya existe
            var notificationExist = Notifications.findOne({alertedUserId: alertedUserId, contentId: contentId, userId: userId, username: username,  action: action});

            //Si es un comentario actualizamos para que se vuelva a mostrar
            if(notificationExist && action == "comment"){
                Notifications.update({_id: notificationExist._id}, {$set: {read : false} });
                Notifications.update({_id: notificationExist._id}, {$set: {createdAt : new Date()} });
            }
            //Si es otra cosa, no hacemos nada
            if(notificationExist){
                return null;
            }

            //Creamos la notificacion!
            var notificationId = Notifications.insert({
                alertedUserId: alertedUserId,
                contentId: contentId,
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
});