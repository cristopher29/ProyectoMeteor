Meteor.startup(function () {
    smtp = {
        username: Meteor.settings.private.smtp.username,
        password: Meteor.settings.private.smtp.password,
        server:   Meteor.settings.private.smtp.server,
        port: Meteor.settings.private.smtp.port
    };

    process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;

    //-- Set the from address
    Accounts.emailTemplates.from = smtp.username;

    //-- Application name
    Accounts.emailTemplates.siteName = 'Proyecto';

    //-- Subject line of the email.
    Accounts.emailTemplates.verifyEmail.subject = function(user) {
        return 'Proyecto : Confirmar email';
    };

    //-- Email text
    Accounts.emailTemplates.verifyEmail.text = function(user, url) {
        return 'Gracias por registrarte.  Por favor haz click en el siguiente enlace para confirmar tu correo: \r\n' + url;
    };

    Accounts.config({
        sendVerificationEmail: true
    });

});