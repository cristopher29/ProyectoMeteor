/**
 * Created by root on 18/01/16.
 */

//Verifica si el usuario es propietario del documento
ownsDocument = function(userId, doc) {
    return doc && doc.userId === userId;
};
ownsNotification = function(userId, doc) {
    return doc && doc.alertedUserId === userId;
};