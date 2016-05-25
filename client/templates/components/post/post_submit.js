/**
 * Created by root on 12/01/16.
 */
var postSubmitHook = {

    onSubmit: function(insertDoc){

        var files = [];
        var image = $('.image')[0].files[0];
        files.push(image);

        Meteor.call('postInsert', insertDoc , function(error, result) {
            //Muestra alert con el error
            if (error){
                Bert.alert(error.reason, 'danger', 'growl-top-right');
                $('#enviar').removeAttr('disabled');
                return false;
            }
            //Muestra alert si existe ese post
            if (result.postExists){
                Bert.alert('Este título y descripción ya existen', 'warning', 'growl-top-right');
                $('#enviar').removeAttr('disabled');
                return false;
            }

            if(image && !insertDoc.youtubeUrl){
                Cloudinary.upload(files,{}, function(err, img){
                    Posts.update({_id: result._id},{$set:{image: img.url, imageId: img.public_id}});
                });
            }

            Router.go('postPage', {_id: result._id, slug: result.slug});
            Bert.alert('Nuevo post agregado', 'success', 'growl-top-right');

        });
        return false;
    }
};

AutoForm.addHooks('insertPost', postSubmitHook);

Template.postSubmit.onRendered(function(){

    $('.preview').hide();

});


Template.postSubmit.events({

    'keyup .youtube-url, change .youtube-url': function(e,t){

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
        $("#upload-file")[0].form.fileName.value = "";
        $('.preview').hide();
        $('.youtube').show();
    },
    'submit form': function(e){
        return false;
    }

});
