/**
 * Created by CristoH on 10/03/2016.
 */
AccountsTemplates.configure({

    // Behavior
    confirmPassword: true,
    enablePasswordChange: true,
    forbidClientAccountCreation: false,
    overrideLoginErrors: true,
    sendVerificationEmail: true,
    lowercaseUsername: false,
    focusFirstInput: true,

    // Appearance
    showAddRemoveServices: false,
    showForgotPasswordLink: true,
    showLabels: true,
    showPlaceholders: true,
    showResendVerificationEmailLink: true,

    // Client-side Validation
    continuousValidation: false,
    negativeFeedback: false,
    negativeValidation: true,
    positiveValidation: true,
    positiveFeedback: true,
    showValidating: true,

    // Redirects
    homeRoutePath: '/',
    redirectTimeout: 2000,

    // Texts
    texts: {
        button: {
            signUp: "Enviar",
            changePwd: "Guardar",
            enrollAccount: "Enviar",
            forgotPwd: "Enviar",
            resetPwd: "Enviar",
            signIn: "Enviar",
            resendVerificationEmail: "Enviar email"
        },
        title: {
            forgotPwd: "Recuperar contraseña",
            changePwd: "Cambiar contraseña",
            enrollAccount: "Enviar invitación",
            resetPwd: "Cambiar contraseña",
            signIn: "Entrar",
            signUp: "Registrate",
            verifyEmail: "Verificar email",
            resendVerificationEmail: "Enviar email de verificación"
        },
        optionalField: "opcional",
        pwdLink_pre: "",
        pwdLink_link: "forgotPassword",
        pwdLink_suff: "",
        resendVerificationEmailLink_pre: "Reenviar email de verificación?",
        resendVerificationEmailLink_link: "Enviar",
        resendVerificationEmailLink_suff: "",
        info: {
            emailSent: "info.emailSent",
            emailVerified: "info.emailVerified",
            pwdChanged: "info.passwordChanged",
            pwdReset: "info.passwordReset",
            pwdSet: "info.passwordReset",
            signUpVerifyEmail: "Registro completado! Por favor verifica tu email y sigue las instrucciones.",
            verificationEmailSent: "Un nuevo email se ha enviado. Si el email no se muestra en tu bandeja de entrada, verifica el correo spam."
        }
    }
});

var pwd = AccountsTemplates.removeField('password');
AccountsTemplates.removeField('email');
AccountsTemplates.addFields([
    {
        _id: "username",
        type: "text",
        displayName: "Usuario",
        required: true,
        minLength: 5
    },
    {
        _id: 'email',
        type: 'email',
        required: true,
        displayName: "email",
        re: /.+@(.+){2,}\.(.+){2,}/,
        errStr: 'Email incorrecto'
    },
    pwd
]);

AccountsTemplates.configureRoute('changePwd',{
    path: '/change-password',
    layoutTemplate: 'mainLayout',
    template: 'form'
});
AccountsTemplates.configureRoute('enrollAccount',{
    path: '/enroll-account',
    layoutTemplate: 'mainLayout',
    template: 'form'
});
AccountsTemplates.configureRoute('forgotPwd',{
    path: '/forgot-password',
    layoutTemplate: 'mainLayout',
    template: 'form'
});
AccountsTemplates.configureRoute('resetPwd',{
    path: '/reset-password',
    layoutTemplate: 'mainLayout',
    template: 'form'
});
AccountsTemplates.configureRoute('signIn',{
    path: '/login',
    layoutTemplate: 'mainLayout',
    template: 'form'
});
AccountsTemplates.configureRoute('signUp',{
    path: '/register',
    layoutTemplate: 'mainLayout',
    template: 'form'
});
AccountsTemplates.configureRoute('verifyEmail',{
    path: '/verify-email',
    layoutTemplate: 'mainLayout',
    template: 'form'
});
AccountsTemplates.configureRoute('resendVerificationEmail',{
    path: '/resend-verification-email',
    layoutTemplate: 'mainLayout',
    template: 'form'
});