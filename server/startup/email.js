Meteor.startup(function () {

    // Configuración del smtp (settings.json)
    smtp = {
        username: Meteor.settings.private.smtp.username,
        password: Meteor.settings.private.smtp.password,
        server:   Meteor.settings.private.smtp.server,
        port: Meteor.settings.private.smtp.port
    };

    // Variable de entorno
    process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;

    // Email del emisor
    Accounts.emailTemplates.from = smtp.username;

    // Nombre del sitio o aplicación
    Accounts.emailTemplates.siteName = 'Proyecto';

    // Después de crear un usuario se envia un email
    Accounts.config({
        sendVerificationEmail: true
    });


    // Reset password

    Accounts.emailTemplates.resetPassword.subject = function (user) {
        return "Proyecto Cristopher Restablecer Contraseña";
    };
    Accounts.emailTemplates.resetPassword.html = function (user, url) {
        return Spacebars.toHTML({ url: url }, Assets.getText('email_templates/reset_password.html'));
    };

    Accounts.emailTemplates.resetPassword.text = function (user, url) {
        var message = 'Proyecto\n\n';
        message += "Hola " + user.originalUserName + ",\n"
        message += "Para restablecer tu contraseña, haz click en el siguiente enlace.\n"
        message += url + "\n\n";
        message += "Si has recibido este email por error, lo puedes ignorar.\n\n\n";
        message += "Att,\n";
        message += "Cristopher :D";

        return message;
    };

    // Verify Email

    Accounts.emailTemplates.verifyEmail.subject = function (user) {
        return "Proyecto Cristopher Verificación Email";
    };
    Accounts.emailTemplates.verifyEmail.html = function (user, url) {
        //var urlWithoutHash = url.replace( '#/', '' );
        return Spacebars.toHTML({ url: url }, Assets.getText('email_templates/verify_email.html'));
    };

    Accounts.emailTemplates.verifyEmail.text = function (user, url) {
        var message = 'Proyecto Cristopher\n\n';
        message += "Hola! " + user.originalUserName + ",\n"
        message += "Para finalizar el proceso de registro, necesitamos confirmar tu email\n"
        message += url + "\n\n";
        message += "Si ha recibido este mensaje por error o no registró una cuenta en mi Proyecto, puede simplemente ignorarlo.\n\n\n";
        message += "Att,\n";
        message += "Cristopher :D";

        return message;
    };

});