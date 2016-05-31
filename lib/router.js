/**
 * Created by CristoH on 25/03/2016.
 */

///////////////////////
//SubsManager /////////
///////////////////////

Subsman = new SubsManager();

////////////////////
//Configure/////////
////////////////////

Router.configure({
    loadingTemplate: 'loading',
    layoutTemplate: 'mainLayout',
    notFoundTemplate: 'notFound',
    progressSpinner : false,
    waitOn: function() {
        if(Meteor.user()){
            return [
                Subsman.subscribe('notifications'),
                Subsman.subscribe('userProfileInfo', Meteor.userId())
            ];
        }
    }
});

Router.route('/verify-email/:_token', {
    action: function(){
        Accounts.verifyEmail( this.params._token, function( error ){
            Router.go('postsList');
            Bert.alert('Email verificado! Gracias!','success','growl-top-right');
        });
    }
});

////////////////////
//Map///////////////
////////////////////


Router.map(function(){

    /////////////////////////////////////////////////////////////
    //////////////////// Posts - Main Layout  ///////////////////
    /////////////////////////////////////////////////////////////

    this.route('postsList',{
        path: '/',
        layoutTemplate: 'mainLayout',
        fastRender: true,
        loadingTemplate: 'loadingEmpty'
    });

    this.route('postsTrending',{
        template: 'postsList',
        path: '/trending',
        layoutTemplate: 'mainLayout',
        loadingTemplate: 'loadingEmpty',
        fastRender: true
    });

    this.route('postsTrendingComments',{
        template: 'postsList',
        path: '/trending-comments',
        layoutTemplate: 'mainLayout',
        loadingTemplate: 'loadingEmpty',
        fastRender: true
    });

    this.route('postsTrendingLikes',{
        template: 'postsList',
        path: '/trending-likes',
        layoutTemplate: 'mainLayout',
        loadingTemplate: 'loadingEmpty',
        fastRender: true
    });

    this.route('postPage', {
        path: '/posts/:_id/:slug',
        layoutTemplate: 'mainLayout',
        fastRender: true
    });

    this.route('postEdit', {
        path: '/posts/:_id/:slug/edit',
        layoutTemplate: 'mainLayout'
    });

    this.route('postSubmit', {
        path: '/submit',
        layoutTemplate: 'mainLayout'
    });

    this.route('postsUserFollowing', {
        path: '/posts/following',
        layoutTemplate: 'mainLayout',
        fastRender: true
    });

    this.route('userAllNotifications',{
        path: '/notifications',
        template: 'allNotifications',
        layoutTemplate: 'mainLayout'
    });

    //////////////////////////////////////////////////////////////
    //////////////////// User Profile Layout /////////////////////
    //////////////////////////////////////////////////////////////


    this.route('userProfile',{
        template: 'userProfilePosts',
        loadingTemplate: 'loadingEmpty',
        path: '/profile/:userId',
        layoutTemplate: 'userProfileLayout'
    });

    this.route('userProfileEdit',{
        path: '/profile/:userId/edit',
        loadingTemplate: 'loadingProfile',
        layoutTemplate: 'userProfileLayout',
        fastRender: true
    });

    this.route('userProfileFollowers',{
        path: '/profile/:userId/followers',
        loadingTemplate: 'loadingProfile',
        layoutTemplate: 'userProfileLayout',
        fastRender: true
    });

    this.route('userProfileFollowing',{
        path: '/profile/:userId/following',
        loadingTemplate: 'loadingProfile',
        layoutTemplate: 'userProfileLayout',
        fastRender: true
    });

    this.route('userDifference',{
        path: '/profile/:userId/difference',
        loadingTemplate: 'loadingProfile',
        layoutTemplate: 'userProfileLayout',
        fastRender: true
    });

    /////////////////////////////////////////////////
    //////////////////// Access /////////////////////
    /////////////////////////////////////////////////

    this.route('signUp',{
        path: '/register',
        layoutTemplate: 'authenticationLayout',
        progress : false
    });

    this.route('signIn',{
        path: '/login',
        layoutTemplate: 'authenticationLayout',
        progress : false
    });

    this.route('forgotPassword',{
        path: '/forgot-password',
        layoutTemplate: 'authenticationLayout',
        progress: false
    });

    this.route('resetPassword',{
        path: '/reset-password/:token',
        layoutTemplate: 'authenticationLayout',
        progress: false
    });

    this.route('emailNotVerified',{
        template: 'emailNotVerified',
        path: '/email-not-verified',
        layoutTemplate: 'mainLayout',
        progress : false,
        onAfterAction: function(){
            if(Meteor.user().emails[0].verified){
                history.back();
            }
        }
    });

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
                    history.back();
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

    if(Meteor.user().emails){
        if(!Meteor.user().emails[0].verified) {
            this.redirect('emailNotVerified');
        }else{
            this.next();
        }
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

var noCurrentUser = function(){
    if(!Meteor.user()){
        this.next();
    }else {
        this.redirect('postsList');
    }
};

////////////////////
//onBeforeActions///
////////////////////


//OnBeforeAction

Router.onBeforeAction(requireLogin, {only:
    [
        'postPage',
        'postSubmit',
        'postEdit',
        'postsUserFollowing',
        'userProfile',
        'userProfileFollowers',
        'userProfileFollowing',
        'userAllNotifications'
    ]
});

Router.onBeforeAction(emailVerified, {only:
    [
        'postPage',
        'postSubmit',
        'postEdit',
        'userProfile',
        'userProfileFollowers',
        'userProfileFollowing',
        'userAllNotifications'
    ]
});

Router.onBeforeAction(ownsPost, {only: 'postEdit'});

Router.onBeforeAction(noCurrentUser, {only: ['signIn','signUp']});
//Router.onBeforeAction('dataNotFound');