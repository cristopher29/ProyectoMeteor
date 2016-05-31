/**
 * Created by CristoH on 11/04/2016.
 */


Template.userProfileEdit.onRendered(function(){


    if(Meteor.user().profile && Meteor.user().profile.display_picture !== null){

        $uploadCrop = $('.imageBox').cropbox({
            thumbBox: '.thumbBox',
            imgSrc: Meteor.user().profile.display_picture
        });


    }else{

        $uploadCrop = $('.imageBox').cropbox({
            thumbBox: '.thumbBox',
            imgSrc: '/img/no-avatar.jpg'
        });
    }

    if(Meteor.user().profile.cardImage){
        $('.preview').show();
    }else{
        $('.preview').hide();
    }


});

Template.userProfileEdit.helpers({

   noServiceTwitter: function(){
       if(!Meteor.user().services.twitter){
           return true;
       }else{
           return false;
       }
   },
    noServiceFacebook: function(){
        if(!Meteor.user().services.facebook){
            return true;
        }else{
            return false;
        }
    }
});


Template.userProfileEdit.events({

   'change #upload-file': function(e,t){

       if (e.target.files && e.target.files[0]) {
           var reader = new FileReader();

           reader.onload = function (image) {

               $uploadCrop = $('.imageBox').cropbox({
                   imgSrc: image.target.result
               });
           };

           reader.readAsDataURL(e.target.files[0]);
       }
       else {
           swal("No has seleccionado una imagen");
       }
   },

    'click #delete-image-preview': function(e){
        $('.preview').hide();
        $('#card-image').val("");
    },

   'change #card-image': function(e,t){

       var input = e.target;
       var imgPath = e.target.value;
       var extn = imgPath.substring(imgPath.lastIndexOf('.') + 1).toLowerCase();

       if (input.files && input.files[0]) {

           if (extn == "gif" || extn == "png" || extn == "jpg" || extn == "jpeg") {

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

       }
   },
   'click #zoomIn': function(e,t){
       $uploadCrop.zoomIn();
   },
   'click #zoomOut': function(e,t){
       $uploadCrop.zoomOut();
   },
   'click #delete-image': function(e,t){
       e.preventDefault();
       Meteor.call('deleteCardImage',Meteor.userId(), Meteor.user().profile.cardImageId, function(error,result){
           if(error){
               return Bert.alert(error.reason, 'danger', 'growl-top-right');
           }
           $('.preview').hide();
           $('#card-image').val("");
       });
   }
});

var editProfileHook = {

    onSuccess: function(){

        var imageData = $uploadCrop.getDataURL();
        var imageCard =$('#card-image')[0].files[0];
        var files = [];
        files.push(imageCard);

        if(imageCard){
            Cloudinary.upload(files,{}, function(err, img){
                Meteor.users.update(Meteor.userId(),{$set:{"profile.cardImage": img.url, "profile.cardImageId": img.public_id}});
            });
        }

        if(imageData !== null){
            Meteor.users.update(Meteor.userId(), {$set:{ "profile.display_picture" : imageData}});
        }

        Bert.alert('Perfil actualizado', 'success', 'growl-top-right');
        Router.go('userProfile', {userId: Meteor.userId()});

        return false;
    }

};

AutoForm.addHooks('updateProfile',editProfileHook);
