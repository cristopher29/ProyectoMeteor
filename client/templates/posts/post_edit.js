/**
 * Created by root on 18/01/16.
 */

Template.postEdit.onRendered(function(){
    $('.postEdit').validate();
});


Template.postEdit.events({

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

        var currentPostId = this._id;

        var postProperties = {
            description: $(e.target).find('[name=description]').val(),
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
