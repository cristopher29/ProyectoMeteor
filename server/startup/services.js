/**
 * Created by CristoH on 23/05/2016.
 */

Meteor.startup(function() {

    var services = Meteor.settings.OAuth;

    ServiceConfiguration.configurations.remove({
        service: 'facebook'
    });

    //console.log(services.facebook.facebookId + " " + services.facebook.facebookSecret);

    ServiceConfiguration.configurations.insert({
        service: 'facebook',
        appId: '1195909910429929',
        secret: services.facebook.secret
    });


    //ServiceConfiguration.configurations.upsert(
    //    { service: "twitter" },
    //    { $set: Meteor.settings.twitter }
    //);

    //console.log('twitter');
    //
    //console.log(services.twitter.twitterKey + " " + services.twitter.twitterSecret);

    ServiceConfiguration.configurations.remove({
        service: "twitter"
    });
    ServiceConfiguration.configurations.insert({
        service: "twitter",
        consumerKey: "mIGkvQZScQm5iM2URRw4tA6Sj",
        loginStyle: "popup",
        secret: services.twitter.secret
    });
});
