/**
 * Created by CristoH on 30/05/2016.
 */

UserDifferenceController = RouteController.extend({

    waitOn: function(){
        return Subsman.subscribe('userProfileInfo', this.params.userId);
    },
    data: function(){

        if(this.ready()){

            var user = Meteor.users.findOne({_id: this.params.userId});

            if(user){

                //SEO.set({
                //    title: 'Tú vs ' + user.username,
                //    og: {
                //        'title': 'Tú vs ' + user.username
                //    }
                //});

                return user;

            }else{
                this.redirect('notFound');
            }
        }
    }

});