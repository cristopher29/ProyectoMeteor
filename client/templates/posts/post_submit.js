/**
 * Created by root on 12/01/16.
 */
var postSubmitHook = {

    onSubmit: function(insertDoc){
        Meteor.call('postInsert', insertDoc, function(error, result) {
            //Muestra alert con el error
            if (error){
                Bert.alert(error.reason, 'danger', 'growl-top-right');
                $('#enviar').removeAttr('disabled');
                return;
            }
            //Muestra alert si existe ese post
            if (result.postExists){
                Bert.alert('Este título y descripción ya existen', 'warning', 'growl-top-right');
                $('#enviar').removeAttr('disabled');
                return;
            }
            Router.go('postPage', {_id: result._id, slug: result.slug});

            Bert.alert('Nuevo post agregado', 'success', 'growl-top-right');
        });
        return false;
    }
};

AutoForm.addHooks('insertPost', postSubmitHook);


Template.postSubmit.events({

    'submit form': function(e){
        e.preventDefault();
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