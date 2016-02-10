/**
 * Created by root on 12/01/16.
 */

Template.postSubmit.helpers({
    PostSchema: function() {
        return PostSchema;
    }
});

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

            if (result.incorrectVal){
                Bert.alert({
                    title: 'ERROR',
                    message: 'Comprueba los datos',
                    type: 'danger',
                    style: 'growl-top-right',
                    icon: 'fa-exclamation-triangle'
                });
                return;
            }

            if (result.postExists) {

                Bert.alert({
                    title: 'ALERTA',
                    message: 'Este link ya ha sido posteado',
                    type: 'warning',
                    style: 'growl-top-right',
                    icon: 'fa-exclamation-triangle '
                });

                Router.go('postPage', {_id: result._id});

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