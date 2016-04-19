/**
 * Created by CristoH on 18/01/16.
 */

//Crear funcion para subir imagen

AutoForm.addHooks('updatePost', {

    onSubmit: function(insertDoc, updateDoc, currentDoc){

        //var files = [];
        //var image = $('.image')[0].files[0];
        //files.push(image);

        Meteor.call('postUpdate', insertDoc , currentDoc, function(error, result) {
            if (error) {
                Bert.alert(error.reason, 'danger', 'growl-top-right');
                $('#enviar').removeAttr('disabled');
                return;
            }

            if (result.postExists){
                Bert.alert('Este título y descripción ya existen', 'warning', 'growl-top-right');
                $('#enviar').removeAttr('disabled');
                return;
            }

            if(image){
                Cloudinary.upload(files,{}, function(err, img){
                    Posts.update({_id: result._id},{$set:{image: img.url, imageId: img.public_id}});
                });
            }

            Router.go('postPage', {_id: result._id, slug: result.slug});

            Bert.alert('Post actualizado', 'success', 'growl-top-right');

        });
    }

});

Template.postEdit.events({

    'submit form': function(e) {
        e.preventDefault();
    },

    'click #delete-image': function(e){
        e.preventDefault();
        Meteor.call('deleteImage',this._id, this.userId, this.imageId);
    },

    'click #eliminar': function(e) {

        e.preventDefault();
        var currentPostId = this._id;

        swal({
            title: '¿Estás seguro?',
            text: 'El post no se podra recuperar',
            type: 'warning',
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Elimínalo!",
            cancelButtonText: "No, pls!",
            showCancelButton: true
        }, function(){
            Posts.remove(currentPostId);
            Router.go('postsList');
        });

    },

    'keyup .note-editable': function(e){
        var num = $('.note-editable').text().replace(/(<([^>]+)>)/ig,"").length;
        var countdown = $('.countdown');
        var remaining = 500 - num;
        countdown.text(remaining + ' caracteres restantes.');
        if(remaining < 0){
            countdown.css('color', 'red');
            $('#enviar').prop('disabled', true);
        }else{
            countdown.css('color', 'black');
            $('#enviar').prop('disabled', false);
        }
    }
});
