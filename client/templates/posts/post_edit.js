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

    'keypress .description': function(){

        $('.description').on('input', function(){
            var limit = 200;
            var remaining = limit - $('.description').val().length;
            var textarea = $('.countdown');
            textarea.text(remaining + ' caracteres restantes.');
            if(remaining<0){
                textarea.css('color','red');
                $('#enviar').attr('disabled','disabled');
            }else{
                textarea.css('color','black');
                $('#enviar').removeAttr('disabled');
            }
        });
    },

    'submit form': function(e) {
        e.preventDefault();
    },
    'click .delete': function(e) {
        e.preventDefault();

        if (confirm("Seguro que quiere eliminar este post?")) {
            var currentPostId = this._id;
            Posts.remove(currentPostId);
            Router.go('postsList');
        }
    }
});
