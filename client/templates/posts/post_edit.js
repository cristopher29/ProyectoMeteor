/**
 * Created by root on 18/01/16.
 */

Template.postEdit.onRendered(function(){
    $('.postEdit').validate();
    var textArea = $('#description');
    textArea.summernote({
        height: 200
    });
    textArea.summernote('code',$('#descOculto').val());
});


Template.postEdit.events({
    'submit form': function(e) {
        e.preventDefault();

        var currentPostId = this._id;

        var postProperties = {
            description: $('#description').summernote('code'),
            shortDescription: $(e.target).find('[name=shortDescription]').val(),
            title: $(e.target).find('[name=title]').val()
        };

        var oldPostProperties = {
            title: this.title,
            description: this.description,
            shortDescription: this.shortDescription
        };

        Meteor.call('postUpdate', currentPostId, postProperties , oldPostProperties, function(error, result) {
            if (error) {
                console.log(error);
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
                    message: 'Este post tiene el mismo título y descripción que otro',
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
