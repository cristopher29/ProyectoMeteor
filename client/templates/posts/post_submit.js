/**
 * Created by root on 12/01/16.
 */


Template.postSubmit.onRendered(function(){

    $('.postSubmit').validate();

});


Template.postSubmit.events({

    'keypress #description': function(){

        $('#description').on('input', function(){
            var limit = 200;
            var remaining = limit - $('#description').val().length;
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

        var post = {
            title: $(e.target).find('[name=title]').val(),
            description: $(e.target).find('[name=description]').val()
        };

        Meteor.call('postInsert', post, function(error, result) {
            // muestra alert con el error
            if (error)
                return alert(error.reason);
            // muestra alert si existe ese post
            if (result.postExists)
                return Bert.alert({
                    title: 'ALERTA',
                    message: 'Este post tiene el mismo título y descripción que otro',
                    type: 'warning',
                    style: 'growl-top-right',
                    icon: 'fa-exclamation-triangle '
                });

            Router.go('postPage', {_id: result._id});

            Bert.alert({
                title: 'CORRECTO',
                message: 'Nuevo post agregado',
                type: 'success',
                style: 'growl-top-right',
                icon: 'fa-check'
            });
        });
    }
});