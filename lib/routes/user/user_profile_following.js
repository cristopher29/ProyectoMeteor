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
        var user = Meteor.users.findOne(this.params.userId);
        if(this.ready()){
            if(user.following){
                user.followingInfo = Meteor.users.find({_id: {$in: user.following}});
            }
        }

        return user;
    }

});