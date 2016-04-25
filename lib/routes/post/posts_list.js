/**
 * Created by CristoH on 22/04/2016.
 */

PostsListController = RouteController.extend({

    waitOn: function(){
        return Meteor.subscribe('allPosts', 10);
    },

    data: function(){
        return Posts.find({},{sort:{createdAt: -1}});
    }

});