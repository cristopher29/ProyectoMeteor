/**
 * Created by CristoH on 18/01/16.
 */

var uploadImage= function(result){

    if($('#upload-file').length){

        var files = [];
        var image = $('.image')[0].files[0];

        if(image){

            files.push(image);
            Cloudinary.upload(files,{}, function(err, img){
                Posts.update({_id: result._id},{$set:{image: img.url, imageId: img.public_id}});
            });
        }
    }
};

AutoForm.addHooks('updatePost', {

    onSubmit: function(insertDoc, updateDoc, currentDoc){

        console.log(insertDoc);
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

            uploadImage(result);

            Router.go('postPage', {_id: result._id, slug: result.slug});

            Bert.alert('Post actualizado', 'success', 'growl-top-right');

        });
        return false;
    }

});

Template.postEdit.onRendered(function () {

    post = this.data;
    $('.preview').hide();

    if(post.youtubeUrl){
        $('.upload').hide();
    }else{
        $('.upload').show();
    }
    if(post.image){
        $('.youtube').hide();
    }else{
        $('.youtube').show();
    }

});

Template.postEdit.events({

    'keyup .youtube-url, change .youtube-url': function(){

        var youtubeInput =  $(".youtube-url");
        if(!youtubeInput.val()){
            $('.upload').show();
        }else{
            $('.upload').hide();
        }
    },
    'change #upload-file': function(e,t){

        var input = e.target;
        var imgPath = e.target.value;
        var extn = imgPath.substring(imgPath.lastIndexOf('.') + 1).toLowerCase();

        if (input.files && input.files[0]) {

            input.form.fileName.value = imgPath;

            if (extn == "gif" || extn == "png" || extn == "jpg" || extn == "jpeg") {

                $('.youtube').hide();

                var reader = new FileReader();

                reader.onload = function (image) {
                    $('#image_preview').attr('src', image.target.result);
                };

                reader.readAsDataURL(input.files[0]);
                $('.preview').show();

            }else{
                e.target.form.fileName.value = "";
                swal('Solo se permiten imagenes!');
            }


        }else{
            $('.youtube').show();
        }

    },
    'click #delete-image-preview': function(e){
        e.preventDefault();
        var input = $("#upload-file");
        input[0].form.fileName.value = "";
        input.val('');
        $('.preview').hide();
        $('.youtube').show();
    },
    'submit form': function(e) {
        e.preventDefault();
    },

    'click #delete-image': function(e){
        e.preventDefault();
        $('.image-container').hide();
        $('.youtube').show();
        Meteor.call('deleteImage',this._id, this.userId, this.imageId, function(error,result){
            if(error){
                return Bert.alert(error.reason, 'danger', 'growl-top-right');
            }
        });
    },

    'click #eliminar': function(e) {

        e.preventDefault();
        var currentPostId = this._id;
        var currentPostUserId = this.userId;
        var imageId = this.imageId;

        swal({
            title: '¿Estás seguro?',
            text: 'El post no se podra recuperar',
            type: 'warning',
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Elimínalo!",
            cancelButtonText: "No, pls!",
            showCancelButton: true
        }, function(){
            Meteor.call('postDelete',currentPostUserId, currentPostId);
            if(imageId){
                Meteor.call('deleteImage',currentPostId, currentPostUserId, imageId, function(error){
                    if(error){
                        Bert.alert(error.reason, 'danger', 'growl-top-right');
                    }
                });
            }
            Router.go('postsList');
        });

    }
});
