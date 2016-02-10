/**
 * Created by root on 18/01/16.
 */


Template.postEdit.events({
    'submit form': function(e) {
        e.preventDefault();

        var currentPostId = this._id;
        var currentPostURL = this.url;

        var postProperties = {
            url: $(e.target).find('[name=url]').val(),
            title: $(e.target).find('[name=title]').val()
        };

        Meteor.call('postUpdate', currentPostId, postProperties , currentPostURL , function(error, result) {
            if (error) {
                // alerta con error
                Bert.alert({
                    title: 'ALERTA',
                    message: error.reason,
                    type: 'warning',
                    style: 'growl-top-right',
                    icon: 'fa-exclamation-triangle '
                });
                return;
            }

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

            if (result.postExists){
                Bert.alert({
                    title: 'ALERTA',
                    message: 'Este link ya ha sido posteado',
                    type: 'warning',
                    style: 'growl-top-right',
                    icon: 'fa-exclamation-triangle '
                });
            }

            Router.go('postPage', {_id: result._id});

        });
    },

    'click .delete': function(e) {

        if (confirm("Seguro que quiere eliminar?")) {
            e.preventDefault();
            var currentPostId = this._id;
            Posts.remove(currentPostId);
            Router.go('postsList');
        }

    }
});
