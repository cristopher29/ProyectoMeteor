/**
 * Created by root on 12/01/16.
 */

Template.postSubmit.events({
    'submit form': function(e) {
        e.preventDefault();

        var post = {
            url: $(e.target).find('#url').val(),
            title: $(e.target).find('[name=title]').val()
        };

        Meteor.call('postInsert', post, function(error, result) {
            // muestra alert con el error
            if (error)
                return alert(error.reason);
            // muestra alert si existe ese post
            if (result.postExists)
                Bert.alert({
                    title: 'ALERTA',
                    message: 'Este link ya ha sido posteado',
                    type: 'warning',
                    style: 'growl-top-right',
                    icon: 'fa-exclamation-triangle '
                });

            if (result.urlNoValida){
                Bert.alert({
                    title: 'ERROR',
                    message: 'URL no valida',
                    type: 'danger',
                    style: 'growl-top-right',
                    icon: 'fa-exclamation-triangle'
                });
                return;
            }
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