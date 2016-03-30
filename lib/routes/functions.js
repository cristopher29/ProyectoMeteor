/**
 * Created by CristoH on 25/03/2016.
 */


//EL USUARIO DEBE ESTAR LOGUEADO
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

//EL USUARIO DEBE VERIFICAR EL EMAIL
var emailVerified = function(){

    if(!Meteor.user().emails[0].verified) {
        this.render('emailNotVerified');
    }else{
        this.next();
    }

};

//AL USUARIO LE PERTENECE EL POST
var ownsPost = function(){

    var postId = this.params._id;
    var postExists = Posts.findOne({userId: Meteor.userId(), _id: postId});
    if(postExists){
        this.next();
    }else{
        this.render('notFound');
    }

};

//POSTS
Router.onBeforeAction('dataNotFound', {only: 'postPage'});
Router.onBeforeAction(requireLogin, {only: ['postPage', 'postSubmit', 'postEdit']});

Router.onBeforeAction(emailVerified, {only: ['postSubmit','postEdit']});

Router.onBeforeAction(ownsPost, {only: 'postEdit'});


//PROFILE
Router.onBeforeAction(requireLogin, {only: 'userProfile'});
Router.onBeforeAction(emailVerified, {only: 'userProfile'});