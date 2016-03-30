/**
 * Created by CristoH on 30/03/2016.
 */

Template.registerHelper('ownPost', function (){
    return this.userId === Meteor.userId();
});