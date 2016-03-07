Meteor.startup(function () {

    //-- Configuración del smtp (settings.json)
    smtp = {
        username: Meteor.settings.private.smtp.username,
        password: Meteor.settings.private.smtp.password,
        server:   Meteor.settings.private.smtp.server,
        port: Meteor.settings.private.smtp.port
    };

    //-- Variable de entorno
    process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;

    //-- Email del emisor
    Accounts.emailTemplates.from = smtp.username;

    //-- Nombre del sitio o aplicación
    Accounts.emailTemplates.siteName = 'Proyecto';

    //-- Asunto del email
    Accounts.emailTemplates.verifyEmail.subject = function(user) {
        return 'Proyecto : Confirmar email';
    };

    //-- Contenido del email
    Accounts.emailTemplates.verifyEmail.text = function(user, url) {
        return 'Gracias por registrarte.  Por favor haz click en el siguiente enlace para confirmar tu correo: \r\n' + url;
    };

    //-- Después de crear un usuario se envia un email
    Accounts.config({
        sendVerificationEmail: true
    });

});