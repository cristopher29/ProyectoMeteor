/**
 * Created by CristoH on 15/03/2016.
 */


Template.comment.onCreated(function(){

    var instance= this;

    instance.isEditing = new ReactiveVar(false);

});

Template.comment.helpers({

    isEditingComment: function(){
        return Template.instance().isEditing.get();
    },
    ownComment: function() {
        return this.userId === Meteor.userId();
    },
    userImage: function(){
        var user = Meteor.users.findOne({_id: this.userId});
        return user.profile.display_picture;
    },
    liked: function(){
        if(this.usersLiked){
            if($.inArray(Meteor.userId(), this.usersLiked) > -1){
                return 'dislike';
            }else{
                return 'like';
            }
        }else{
            return 'like';
        }
    }
});

Template.comment.events({
    'click .delete' : function(e){
        e.preventDefault();

        var currentCommentId = this._id;

        swal({
            title: '¿Estás seguro?',
            text: 'El comentario no se podra recuperar',
            type: 'warning',
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Elimínalo!",
            cancelButtonText: "No, pls!",
            showCancelButton: true
        }, function(){
            Meteor.call('commentDelete', currentCommentId);
        });
    },
    'click .like': function(e,t){

        if(Meteor.userId()){
            Meteor.call('commentLike', this._id ,Meteor.userId(), function(error, result){
                if(error){
                    Bert.alert(error.reason, 'danger', 'growl-top-right');
                }
            });
        }else{
            Bert.alert('Necesitas iniciar sesión', 'warning', 'growl-top-right');
        }
    },
    'click .dislike': function(e,t){

        if(Meteor.userId()){
            Meteor.call('commentDislike', this._id ,Meteor.userId(), function(error, result){
                if(error){
                    Bert.alert(error.reason, 'danger', 'growl-top-right');
                }
            });
        }else{
            Bert.alert('Necesitas iniciar sesión', 'warning', 'growl-top-right');
        }
    },
    'click .edit-comment': function(e,t){
        Template.instance().isEditing.set(!Template.instance().isEditing.get());
    },
    'submit .editing-comment': function(e,t){
        e.preventDefault();

        var comment = $('.comment-edit-input').val();
        if(comment){
            Meteor.call('commentUpdate', this._id, comment, function(error, result){
                if(error){
                    Bert.alert(error.reason, 'danger', 'growl-top-right');
                }
            });
            Template.instance().isEditing.set(false);
            Bert.alert('Comentario actualizado', 'success', 'growl-top-right');
        }else{
            Bert.alert('Comentario vacio', 'warning', 'growl-top-right');
        }
    }

});