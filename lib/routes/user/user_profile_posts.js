/**
 * Created by CristoH on 21/03/2016.
 */

UserProfileController = RouteController.extend({

    waitOn: function(){
        return Meteor.subscribe('userProfile',this.params.userId, 10);
    },
    data: function() {

        return Meteor.users.findOne({_id: this.params.userId});

    }

});

