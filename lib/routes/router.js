/**
 * Created by CristoH on 10/01/2016.
 */


Router.configure({
    loadingTemplate: 'loading',
    layoutTemplate: 'layout',
    notFoundTemplate: 'notFound',
    waitOn: function() {
        return Meteor.subscribe('posts');
    }
});

Router.route('/', {name: 'postsList'});

Router.route('/posts/:_id', {
    name: 'postPage',
    waitOn: function() {
        return Meteor.subscribe('comments', this.params._id);
    },
    data: function() {
        return Posts.findOne(this.params._id);
    }
});

Router.route('/posts/:_id/edit', {
    name: 'postEdit',
    data: function() {
        return Posts.findOne(this.params._id);
    }
});

Router.route('/submit', {name: 'postSubmit'});

// el usuario debe estar logueado
var requireLogin = function() {
    if (! Meteor.user()) {
        if (Meteor.loggingIn()) {
            this.render(this.loadingTemplate);
        } else {
            this.render('accessDenied');
        }
    } else {
        this.next();
    }
};

//el usuario debe verificar el email
var emailVerified = function(){

    if(!Meteor.user().emails[0].verified) {
        this.render('emailVerified');
    }else{
        this.next();
    }

};

//el usuario debe verificar el email
var ownsPost = function(){

    if(this._id === Meteor.userId()) {
        this.next();
    }else{
        this.render('notFound');
    }

};


Router.onBeforeAction('dataNotFound', {only: 'postPage'});
Router.onBeforeAction(requireLogin, {only: 'postPage'});

Router.onBeforeAction(requireLogin, {only: 'postSubmit'});
Router.onBeforeAction(emailVerified, {only: 'postSubmit'});

Router.onBeforeAction(requireLogin, {only: 'postEdit'});
Router.onBeforeAction(ownsPost, {only: 'postEdit'});
Router.onBeforeAction(emailVerified, {only: 'postEdit'});