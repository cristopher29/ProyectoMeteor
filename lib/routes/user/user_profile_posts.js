/**
 * Created by CristoH on 21/03/2016.
 */

UserProfileController = RouteController.extend({

    data: function() {

        if(this.ready()){
            return Meteor.users.findOne({_id: this.params.userId});
        }

    }

});

