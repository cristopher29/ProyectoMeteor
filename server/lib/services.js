/**
 * Created by CristoH on 23/05/2016.
 */

//Meteor.startup(function() {
//
//
    ServiceConfiguration.configurations.remove({
        service: "twitter"
    });
    ServiceConfiguration.configurations.insert({
        service: "twitter",
        consumerKey: Meteor.settings.private.twitter.consumerKey,
        loginStyle: "popup",
        secret: Meteor.settings.private.twitter.secret
    });
//
//
//    //ServiceConfiguration.configurations.upsert(
//    //    { service: "twitter" },
//    //    {
//    //        $set: {
//    //            consumerKey: Meteor.settings.private.twitter.consumerKey,
//    //            loginStyle: "popup",
//    //            secret: Meteor.settings.private.twitter.secret
//    //        }
//    //    }
//    //);
//
//});
