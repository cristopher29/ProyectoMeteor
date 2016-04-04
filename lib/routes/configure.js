/**
 * Created by CristoH on 25/03/2016.
 */

Router.configure({
    loadingTemplate: 'loading',
    layoutTemplate: 'layout',
    notFoundTemplate: 'notFound',
    waitOn: function() {
        return [
            Meteor.subscribe('posts'),
            Meteor.subscribe('notifications'),
            Meteor.subscribe('allUsers')
        ];
    }
});