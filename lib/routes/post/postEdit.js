/**
 * Created by CristoH on 18/04/2016.
 */

PostEditController = RouteController.extend({

    data: function() {
        return Posts.findOne({_id: this.params._id});
    }

});