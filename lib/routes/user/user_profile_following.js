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

        if(Meteor.user() && this.ready()){

            this.render('userProfileCard',{to:'userProfileCard'});
            this.render('recommendations',{to:'recommendations'});

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