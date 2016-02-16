/**
 * Created by root on 18/01/16.
 */

Template.postSubmit.onRendered(function(){
    $('.postEdit').validate();
});

Template.postEdit.events({
    'submit form': function(e) {
        e.preventDefault();

        var currentPostId = this._id;

        var postProperties = {
            description: $(e.target).find('[name=description]').val(),
            title: $(e.target).find('[name=title]').val()
        };

        var oldPostProperties = {
            title: this.title,
            description: this.description
        };

        Meteor.call('postUpdate', currentPostId, postProperties , oldPostProperties, function(error, result) {
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

            if (result.postExists){
                return Bert.alert({
                    title: 'ALERTA',
                    message: 'Este link ya ha sido posteado',
                    type: 'warning',
                    style: 'growl-top-right',
                    icon: 'fa-exclamation-triangle '
                });
            }

            Router.go('postPage', {_id: result._id});

            Bert.alert({
                title: 'CORRECTO',
                message: 'Post actualizado',
                type: 'success',
                style: 'growl-top-right',
                icon: 'fa-check'
            });

        });
    },

    'click .delete': function(e) {
        e.preventDefault();

        if (confirm("Seguro que quiere eliminar este post?")) {
            var currentPostId = this._id;
            Posts.remove(currentPostId);
            Router.go('postsList');
        }
    }
});
