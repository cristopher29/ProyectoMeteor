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

        if(Meteor.user() && this.ready()){

            this.render('userProfileCard',{to:'userProfileCard'});
            this.render('recommendations',{to:'recommendations'});

            var user = Meteor.users.findOne(this.params.userId);
            if(user){

                if(user.followers){
                    user.followersInfo = Meteor.users.find({_id: {$in: user.followers}});
                }

                return user;

            }else{
                this.redirect('notFound');
            }

        }

    }

});