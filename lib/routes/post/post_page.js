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

        if(Meteor.user() && this.ready()) {

            var post = Posts.findOne({_id: this.params._id});

            if(post){
                post.comments = Comments.find({postId: this.params._id}, {sort: {createdAt: -1}}).fetch();

                return post;

            }else{
                this.redirect('notFound');
            }

        }

    }

});