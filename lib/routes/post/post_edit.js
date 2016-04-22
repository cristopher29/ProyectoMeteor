/**
 * Created by CristoH on 18/04/2016.
 */

PostEditController = RouteController.extend({

    waitOn: function(){
        return Meteor.subscribe('singlePost', this.params._id) ;
    },
    data: function() {
        return Posts.findOne({_id: this.params._id});
    }

});