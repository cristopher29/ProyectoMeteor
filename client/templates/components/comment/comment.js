/**
 * Created by CristoH on 15/03/2016.
 */
Template.comment.helpers({
    ownComment: function() {
        return this.userId === Meteor.userId();
    },
    'userImage': function(){
        var user = Meteor.users.findOne({_id: this.userId});
        return user.profile.display_picture;
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

    }

});