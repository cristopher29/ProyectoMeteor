/**
 * Created by root on 18/01/16.
 */

var postEditHook = {

    onSubmit: function(insertDoc, updateDoc, currentDoc){

        Meteor.call('postUpdate', currentDoc._id, insertDoc , currentDoc, function(error, result) {
            if (error) {
                Bert.alert(error.reason, 'warning', 'growl-top-right');
                $('#enviar').removeAttr('disabled');
                return;
            }

            if (result.postExists){
                Bert.alert('Este título y descripción ya existen', 'warning', 'growl-top-right');
                $('#enviar').removeAttr('disabled');
                return;
            }

            Router.go('postPage', {_id: result._id});

            Bert.alert('Post actualizado', 'success', 'growl-top-right');

        });
    }
};

AutoForm.addHooks('updatePost', postEditHook);

Template.postEdit.events({

    'submit form': function(e) {
        e.preventDefault();
    },
    'click #eliminar': function(e) {
        e.preventDefault();

        if (confirm("Seguro que quiere eliminar este post?")) {
            var currentPostId = this._id;
            Posts.remove(currentPostId);
            Router.go('postsList');
        }
    }
});
