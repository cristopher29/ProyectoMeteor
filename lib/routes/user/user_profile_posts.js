/**
 * Created by CristoH on 21/03/2016.
 */

UserProfileController = RouteController.extend({

    waitOn: function(){
        return Meteor.subscribe('userProfile',this.params.userId, 10);
    },
    data: function() {

        if(Meteor.user() && this.ready()){

            this.render('userProfileCard',{to:'userProfileCard'});
            this.render('recommendations',{to:'recommendations'});

            var user = Meteor.users.findOne({_id: this.params.userId});
            if(user){
                user.profilePosts = Posts.find({userId: user._id},{sort:{createdAt: -1}}).fetch();

                return user;

            }else{
                this.redirect('notFound');
            }

        }


    }

});
