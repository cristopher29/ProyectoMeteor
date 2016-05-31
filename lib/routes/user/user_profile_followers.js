/**
 * Created by CristoH on 19/04/2016.
 */

UserProfileFollowersController = RouteController.extend({

    waitOn: function() {
        return Subsman.subscribe('userFollowers', this.params.userId);
    },

    data: function() {

        if(this.ready()){

            var user = Meteor.users.findOne(this.params.userId);

            if(user){

                //SEO.set({
                //    title: 'Personas siguiendo a ' + user.username,
                //    og: {
                //        'title': 'Personas siguiendo a ' + user.username
                //    }
                //});

                if(typeof user.followers !== 'undefined' && user.followers.length > 0){
                    user.followersInfo = Meteor.users.find({_id: {$in: user.followers}});
                }

                return user;

            }else{
                this.redirect('notFound');
            }

        }else{
            this.render('loadingProfile');
        }


    }
});