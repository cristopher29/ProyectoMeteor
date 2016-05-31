/**
 * Created by CristoH on 31/05/2016.
 */

Meteor.startup(function() {

    var localeFromBrowser = window.navigator.userLanguage || window.navigator.language;
    console.log(localeFromBrowser);
    var locale = 'en';
    if (localeFromBrowser.match(/de/)) {
        locale = 'de';
    }
    i18n.setLanguage(locale);

});