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
    progressSpinner : false,
    waitOn: function() {
        return [
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
        template: 'userProfilePosts',
        path: '/profile/:userId',
        layoutTemplate: 'userProfileLayout'
    });

    this.route('userProfileFollowers',{
        path: '/profile/:userId/followers',
        layoutTemplate: 'userProfileLayout'
    });

    this.route('userProfileFollowing',{
        path: '/profile/:userId/following',
        layoutTemplate: 'userProfileLayout'
    });

    /////////////////////////////////////////////////
    //////////////////// Access /////////////////////
    /////////////////////////////////////////////////

    this.route('notFound',{
        template: 'notFound',
        path: '/four-oh-four',
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
        this.redirect('notFound');
    }

};

////////////////////
//onBeforeActions///
////////////////////


//OnBeforeAction para los Posts
Router.onBeforeAction(requireLogin, {only: ['postPage', 'postSubmit', 'postEdit']});
Router.onBeforeAction(emailVerified, {only: ['postSubmit','postEdit']});
Router.onBeforeAction(ownsPost, {only: 'postEdit'});


//OnBeforeAction para el Perfil
Router.onBeforeAction(requireLogin, {only: ['userProfile','userProfileFollowers','userProfileFollowing']});
Router.onBeforeAction(emailVerified, {only: ['userProfile','userProfileFollowers','userProfileFollowing']});

//Router.onBeforeAction('dataNotFound');