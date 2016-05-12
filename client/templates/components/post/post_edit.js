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

    post = Posts.findOne();
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

        if (input.files && input.files[0]) {

            $('.youtube').hide();

            var reader = new FileReader();

            reader.onload = function (image) {
                $('#image_preview').attr('src', image.target.result);
            };

            reader.readAsDataURL(input.files[0]);
            $('.preview').show();

        }else{
            $('.youtube').show();
        }

    },
    'click #delete-image-preview': function(e){
        e.preventDefault();
        $("#upload-file").val("");
        $('.preview').hide();
        $('.youtube').show();
    },
    'submit form': function(e) {
        e.preventDefault();
    },

    'click #delete-image': function(e){
        e.preventDefault();
        Meteor.call('deleteImage',this._id, this.userId, this.imageId);
        $('.youtube').show();
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
                Meteor.call('deleteImage',currentPostId, currentPostUserId, imageId);
            }
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
