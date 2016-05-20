/**
 * Created by CristoH on 09/05/2016.
 */

Template.registerHelper('ownProfile', function (){

    var res = false;
    var userId = Router.current().params.userId;

    if(ActiveRoute.name('userAllNotifications') || userId === Meteor.userId()){
        res = true;
    }
    return res;

});