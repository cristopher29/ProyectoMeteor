/**
 * Created by CristoH on 09/05/2016.
 */

Template.registerHelper('ownProfile', function (){

    var res = false;
    var userId = Router.current().params.userId;

    if(Router.current().route.getName() === 'userAllNotifications'){
        res = true;
    }
    if(userId === Meteor.userId()){
        res = true;
    }
    return res;

});