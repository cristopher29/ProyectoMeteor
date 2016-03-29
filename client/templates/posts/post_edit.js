/**
 * Created by CristoH on 18/01/16.
 */

//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
////////////					AUTOFORM HOOK:							          ////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////


AutoForm.addHooks('updatePost', {

    onSubmit: function(insertDoc, updateDoc, currentDoc){

        Meteor.call('postUpdate', currentDoc._id, insertDoc , currentDoc, function(error, result) {
            if (error) {
                Bert.alert(error.reason, 'danger', 'growl-top-right');
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

});


//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
////////////					EVENTOS EDITAR POST:							  ////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////


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
    },

    'keyup .note-editable': function(e){
        var num = $('.note-editable').text().replace(/(<([^>]+)>)/ig,"").length;
        var countdown = $('.countdown');
        var remaining = 500 - num;
        countdown.text(remaining + ' caracteres restantes.');
        if(remaining < 0){
            countdown.css('color', 'red');
            $('#enviar').prop('disabled', true);
        }else{
            countdown.css('color', 'black');
            $('#enviar').prop('disabled', false);
        }
    }
});
