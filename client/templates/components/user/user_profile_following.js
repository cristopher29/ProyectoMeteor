/**
 * Created by CristoH on 24/04/2016.
 */


Template.userProfileFollowing.helpers({
    'userFollowing': function(){
        return Meteor.users.find({ _id: { $ne: Router.current().params.userId } } );
    }
});