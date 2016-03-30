/**
 * Created by CristoH on 25/03/2016.
 */

Router.configure({
    loadingTemplate: 'loading',
    layoutTemplate: 'layout',
    notFoundTemplate: 'notFound',
    waitOn: function() {
        if(Meteor.user()){
            return [
                Meteor.subscribe('posts'),
                Meteor.subscribe('notifications')
            ];
        }
    }
});