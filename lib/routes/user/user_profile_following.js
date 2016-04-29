/**
 * Created by CristoH on 24/04/2016.
 */

UserProfileFollowingController = RouteController.extend({

    waitOn: function() {
        return Meteor.subscribe('userFollowing', this.params.userId);
    },

    data: function() {

        if(this.ready()){

            var user = Meteor.users.findOne(this.params.userId);

            if(user){
                if(user.following){
                    user.followingInfo = Meteor.users.find({_id: {$in: user.following}});
                }

                return user;

            }else{
                this.redirect('notFound');
            }

        }


    }

});