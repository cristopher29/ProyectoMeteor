/**
 * Created by root on 12/01/16.
 */


Template.postSubmit.onRendered(function(){
    $('.postSubmit').validate();
});


Template.postSubmit.events({
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