/**
 * Created by CristoH on 05/05/2016.
 */


UserProfileController = RouteController.extend({

    waitOn: function(){
        return Subsman.subscribe('userProfileInfo', this.params.userId);
    },

    data: function(){

        if(this.ready() && Meteor.userId()){

            var user = Meteor.users.findOne({_id: this.params.userId});

            if(user){

                //SEO.set({
                //    title: 'Perfil de ' + user.username,
                //    og: {
                //        'title': 'Perfil de ' + user.username
                //    }
                //});

                return user;

            }else{
                this.redirect('notFound');
            }
        }
    }

});