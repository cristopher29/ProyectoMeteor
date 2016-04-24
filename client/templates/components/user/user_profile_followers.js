/**
 * Created by CristoH on 24/04/2016.
 */


Template.userProfileFollowers.helpers({
    'userFollowers': function(){
        return Meteor.users.find({ _id: { $ne: Router.current().params.userId } } );
    }
});