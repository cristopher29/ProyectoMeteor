/**
 * Created by CristoH on 28/04/2016.
 */

UserAllNotificationsController = RouteController.extend({

    waitOn: function(){
        if(Meteor.user()){
            return Meteor.subscribe('userProfile',Meteor.userId());
        }else{
            this.redirect('accessDenied');
        }

    },
    data: function() {

        if(Meteor.user() && this.ready()){

            this.render('userProfileCard',{to:'userProfileCard'});
            this.render('recommendations',{to:'recommendations'});

            var user = Meteor.users.findOne({_id: Meteor.userId()});
            if(user){
                return user;
            }else{
                this.redirect('notFound');
            }

        }


    }

});