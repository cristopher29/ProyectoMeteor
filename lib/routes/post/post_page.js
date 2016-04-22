/**
 * Created by CristoH on 18/04/2016.
 */

PostPageController = RouteController.extend({

    waitOn: function() {
        if(Meteor.user()){
            return Meteor.subscribe('postWithComments', this.params._id);
        }
    },
    data: function() {
        return Posts.findOne({_id: this.params._id});
    }

});