/**
 * Created by CristoH on 24/04/2016.
 */

UserProfileFollowingController = RouteController.extend({

    waitOn: function() {
        if(Meteor.user()){
            return Meteor.subscribe('userFollowing', this.params.userId);
        }
    },

    data: function() {
        return Meteor.users.findOne(this.params.userId);
    }

});