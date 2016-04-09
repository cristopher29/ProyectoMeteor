/**
 * Created by CristoH on 25/03/2016.
 */


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

    var postSlug = this.params.slug;
    var postExists = Posts.findOne({userId: Meteor.userId(), slug: postSlug});
    if(postExists){
        this.next();
    }else{
        this.render('notFound');
    }

};

//OnBeforeAction para los Posts
Router.onBeforeAction('dataNotFound', {only: 'postPage'});
Router.onBeforeAction(requireLogin, {only: ['postPage', 'postSubmit', 'postEdit']});
Router.onBeforeAction(emailVerified, {only: ['postSubmit','postEdit']});
Router.onBeforeAction(ownsPost, {only: 'postEdit'});


//OnBeforeAction para el perfil
Router.onBeforeAction('dataNotFound', {only: 'userProfile'});
Router.onBeforeAction(requireLogin, {only: 'userProfile'});
Router.onBeforeAction(emailVerified, {only: 'userProfile'});