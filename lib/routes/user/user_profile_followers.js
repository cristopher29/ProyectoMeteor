/**
 * Created by CristoH on 19/04/2016.
 */

UserProfileFollowersController = RouteController.extend({

    waitOn: function() {
        if(Meteor.user()){
            return Meteor.subscribe('userFollowers', this.params.userId);
        }
    },

    data: function() {
        return Meteor.users.findOne(this.params.userId);
    }

});