/**
 * Created by CristoH on 11/04/2016.
 */

Template.editProfile.onRendered(function(){


    if(Meteor.user().profile.display_picture !== null){

        $uploadCrop = $('.imageBox').cropbox({
            thumbBox: '.thumbBox',
            imgSrc: Meteor.user().profile.display_picture
        });

    }else{

        $uploadCrop = $('.imageBox').cropbox({
            thumbBox: '.thumbBox',
            imgSrc: 'img/no-avatar.jpg'
        });
    }
});


Template.editProfile.events({

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
   'click #zoomIn': function(e,t){
       $uploadCrop.zoomIn();
   },
   'click #zoomOut': function(e,t){
       $uploadCrop.zoomOut();
   }
});

var editProfileHook = {
    onSuccess: function(){

        var imageData = $uploadCrop.getDataURL();

        if(imageData !== null){
            Meteor.users.update(Meteor.userId(), {$set:{ "profile.display_picture" : imageData}});
        }

        Modal.hide('editProfile');
        Bert.alert('Perfil actualizado', 'success', 'growl-top-right');

        return false;
    }

};

AutoForm.addHooks('updateProfile',editProfileHook);
