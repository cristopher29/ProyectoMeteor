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
        var user = Meteor.users.findOne(this.params.userId);
        if(this.ready()){
            if(user.followers){
                user.followersInfo = Meteor.users.find({_id: {$in: user.followers}});
            }
        }

        return user;
    }

});