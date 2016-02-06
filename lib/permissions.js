/**
 * Created by root on 18/01/16.
 */
// verifica si el usuarioID es propietario del documento
ownsDocument = function(userId, doc) {
    return doc && doc.userId === userId;
};
