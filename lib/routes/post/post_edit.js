/**
 * Created by CristoH on 18/04/2016.
 */

PostEditController = RouteController.extend({

    waitOn: function(){
        return Subsman.subscribe('singlePost', this.params._id) ;
    },
    data: function() {

        if(this.ready()){

            var post = Posts.findOne({_id: this.params._id});
            if(post){
                return post;
            }else{
                this.redirect('notFound');
            }
        }

    }

});