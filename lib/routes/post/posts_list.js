/**
 * Created by CristoH on 22/04/2016.
 */

PostsListController = RouteController.extend({

    waitOn: function(){
        return Meteor.subscribe('allPosts', 10);
    },

    data: function(){

        if(this.ready()){
            var lista = {};

            lista.posts = Posts.find({},{sort:{createdAt: -1}}).fetch();

            return lista;
        }



    }

});