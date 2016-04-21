/**
 * Created by CristoH on 25/03/2016.
 */

////////////////////
//Configure/////////
////////////////////

Router.configure({
    loadingTemplate: 'loading',
    layoutTemplate: 'layout',
    notFoundTemplate: 'notFound',
    waitOn: function() {
        return [
            Meteor.subscribe('posts'),
            Meteor.subscribe('notifications')
        ];
    }
});

////////////////////
//Map///////////////
////////////////////


Router.map(function(){

    /////////////////////////////////////////////////
    //////////////////// Post ///////////////////////
    /////////////////////////////////////////////////

    this.route('postsList',{
        path: '/',
        layoutTemplate: 'layout'
    });

    this.route('postPage', {
        path: '/posts/:_id/:slug',
        layoutTemplate: 'layout'
    });

    this.route('postEdit', {
        path: '/posts/:_id/:slug/edit',
        layoutTemplate: 'layout'
    });

    this.route('postSubmit', {
        path: '/submit',
        layoutTemplate: 'layout'
    });

    /////////////////////////////////////////////////
    //////////////////// User ///////////////////////
    /////////////////////////////////////////////////

    this.route('userProfile',{
        template: 'userProfilePost',
        path: '/profile/:userId',
        layoutTemplate: 'userProfileLayout'
    });

    this.route('userProfileFollowers',{
        path: '/profile/:userId/followers',
        layoutTemplate: 'userProfileLayout'
    });

    /////////////////////////////////////////////////
    //////////////////// Access /////////////////////
    /////////////////////////////////////////////////

    this.route('notFound',{
        path: '/404',
        layoutTemplate: 'layout'
    });


});

////////////////////
//Functions/////////
////////////////////

//El usuario debe estar logueado
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

//El usuario debe verificar el email
var emailVerified = function(){

    if(!Meteor.user().emails[0].verified) {
        this.render('emailNotVerified');
    }else{
        this.next();
    }

};

//Al usuario le pertenece el post
var ownsPost = function(){

    var postId = this.params._id;
    var postExists = Posts.findOne({userId: Meteor.userId(), _id: postId});
    if(postExists){
        this.next();
    }else{
        this.render('notFound');
    }

};

////////////////////
//onBeforeActions///
////////////////////


//OnBeforeAction para los Posts
Router.onBeforeAction('dataNotFound', {only: 'postPage'});
Router.onBeforeAction(requireLogin, {only: ['postPage', 'postSubmit', 'postEdit']});
Router.onBeforeAction(emailVerified, {only: ['postSubmit','postEdit']});
Router.onBeforeAction(ownsPost, {only: 'postEdit'});


//OnBeforeAction para el Perfil
Router.onBeforeAction('dataNotFound', {only: ['userProfile','userProfileFollowers']});
Router.onBeforeAction(requireLogin, {only: ['userProfile','userProfileFollowers']});
Router.onBeforeAction(emailVerified, {only: ['userProfile','userProfileFollowers']});