/**
 * Created by CristoH on 31/05/2016.
 */

Meteor.startup(function() {

    var localeFromBrowser = window.navigator.userLanguage || window.navigator.language;
    console.log(localeFromBrowser);
    var locale = 'es';
    if (localeFromBrowser.match(/en/)) {
        locale = 'en';
    }
    i18n.setLanguage(locale);

});