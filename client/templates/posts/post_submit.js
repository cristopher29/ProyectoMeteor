/**
 * Created by root on 12/01/16.
 */
var postSubmitHook = {

    onSubmit: function(insertDoc){
        Meteor.call('postInsert', insertDoc, function(error, result) {
            // muestra alert con el error
            if (error){
                Bert.alert(error.reason, 'danger', 'growl-top-right');
                $('#enviar').removeAttr('disabled');
                return;
            }
            // muestra alert si existe ese post
            if (result.postExists){
                Bert.alert('Este título y descripción ya existen', 'warning', 'growl-top-right');
                $('#enviar').removeAttr('disabled');
                return;
            }
            Router.go('postPage', {_id: result._id});

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
        console.log(num);
        var remaining = 1000 - num;
        $('.countdown').text(remaining + ' caracteres restantes.');
        var key = e.keyCode;
        allowed_keys = [8, 37, 38, 39, 40, 46];
        if($.inArray(key, allowed_keys) != -1)
            return true;
        else if(num > 1000){
            e.preventDefault();
            e.stopPropagation()
        }
    }

});