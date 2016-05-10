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

            if(image){
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


Template.postSubmit.events({

    'keyup .youtube-url, change .youtube-url': function(){

        var youtubeInput =  $(".youtube-url");
        if(!youtubeInput.val()){
            $('.upload').show();
        }else{
            $('.upload').hide();
        }

    },
    'change #upload-file': function(){
        if (!$('#upload-file').val()) {
            $('.youtube').show();
        }else{
            $('.youtube').hide();
        }
    },
    'submit form': function(e){
        return false;
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
