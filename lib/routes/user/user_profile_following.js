/**
 * Created by CristoH on 24/04/2016.
 */

UserProfileFollowingController = RouteController.extend({

    waitOn: function() {
        return Subsman.subscribe('userFollowing', this.params.userId);
    },

    data: function() {

        if(this.ready()){

            var user = Meteor.users.findOne(this.params.userId);

            if(user){

                //SEO.set({
                //    title: 'Personas seguidas por ' + user.username,
                //    og: {
                //        'title': 'Personas seguidas por ' + user.username
                //    }
                //});

                if(typeof user.following !== 'undefined' && user.following.length > 0 ){
                    user.followingInfo = Meteor.users.find({_id: {$in: user.following}});
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