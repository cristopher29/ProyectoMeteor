/**
 * Created by CristoH on 15/03/2016.
 */
Template.comment.helpers({
    ownComment: function() {
        return this.userId === Meteor.userId();
    }
});

Template.comment.events({
    'click .delete' : function(e){
        e.preventDefault();
        Modal.show('deleteCommentModal');
        Session.set('commentId',this._id);
    }

});
Template.deleteCommentModal.events({
    'click .deleteComment' : function(e){
        e.preventDefault();
        var currentCommentId = Session.get('commentId');
        Meteor.call('commentDelete', currentCommentId);
        Modal.hide('deleteCommentModal')
    }
});