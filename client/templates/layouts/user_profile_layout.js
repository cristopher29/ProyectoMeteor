/**
 * Created by CristoH on 20/05/2016.
 */

Template.userProfileLayout.helpers({
   bgColor: function(){
       var userId = Router.current().params.userId;
       var user = Meteor.users.findOne({_id: userId});
       return user.profile.bgColor;
   },
   textColor: function(){
       var userId = Router.current().params.userId;
       var user = Meteor.users.findOne({_id: userId});
       return user.profile.textColor;
   }
});