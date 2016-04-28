/**
 * Created by CristoH on 25/03/2016.
 */

////////////////////
//Configure/////////
////////////////////

Router.configure({
    loadingTemplate: 'loading',
    layoutTemplate: 'mainLayout',
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
        layoutTemplate: 'mainLayout',
        fastRender: true
    });

    this.route('postPage', {
        path: '/posts/:_id/:slug',
        layoutTemplate: 'mainLayout'
    });

    this.route('postEdit', {
        path: '/posts/:_id/:slug/edit',
        layoutTemplate: 'mainLayout'
    });

    this.route('postSubmit', {
        path: '/submit',
        layoutTemplate: 'mainLayout'
    });

    /////////////////////////////////////////////////
    //////////////////// User ///////////////////////
    /////////////////////////////////////////////////


    this.route('userProfile',{
        template: 'userProfilePosts',
        path: '/profile/:userId',
        layoutTemplate: 'userProfileLayout',
        fastRender: true
    });

    this.route('userProfileFollowers',{
        path: '/profile/:userId/followers',
        layoutTemplate: 'userProfileLayout',
        fastRender: true
    });

    this.route('userProfileFollowing',{
        path: '/profile/:userId/following',
        layoutTemplate: 'userProfileLayout',
        fastRender: true
    });

    this.route('userAllNotifications',{
        path: '/notifications',
        template: 'allNotifications',
        layoutTemplate: 'userProfileLayout',
        fastRender: true
    });

    /////////////////////////////////////////////////
    //////////////////// Access /////////////////////
    /////////////////////////////////////////////////

    this.route('accessDenied',{
        template: 'accessDenied',
        path: '/access-denied',
        layoutTemplate: 'mainLayout',
        progress : false,
        onAfterAction: function(){
            if(Meteor.user()){
                if (Meteor.loggingIn()) {
                    this.render(this.loadingTemplate);
                } else {
                    this.redirect('postsList');
                }
            }
        }
    });

    this.route('notFound',{
        template: 'notFound',
        path: '/four-oh-four',
        layoutTemplate: 'mainLayout',
        progress : false
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
            this.redirect('accessDenied');
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