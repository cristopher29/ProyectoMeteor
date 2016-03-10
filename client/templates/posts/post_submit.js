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


    'submit form': function(e){
        e.preventDefault();
    }

});