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
            // display the error to the user and abort
            if (error)
                return alert(error.reason);
            if (result.postExists)
                alert('Este link ya ha sido posteado');
            if (result.noTieneHTTP){
                return alert('Enlace invalido, falta http://');
            }
            Router.go('postPage', {_id: result._id});
        });
    }
});
