/**
 * Created by CristoH on 11/04/2016.
 */

$(window).load(function() {
    $uploadCrop = $('.imageBox').cropbox({
        thumbBox: '.thumbBox'
    });
});

Template.editProfile.onRendered(function(){


    if(Meteor.user().profile.display_picture !== null){

        $uploadCrop = $('.imageBox').cropbox({
            thumbBox: '.thumbBox',
            imgSrc: Meteor.user().profile.display_picture
        });

        //$uploadCrop.croppie('bind', {
        //    url: Meteor.user().profile.display_picture
        //});
        //
        //$('.cr-boundary img').css('opacity',1);

        //rot = 0;
        //ratio = 1;
        //CanvasCrop = $.CanvasCrop({
        //
        //    // outercontainer
        //    cropBox : ".imageBox",
        //
        //    // inner container
        //    thumbBox : ".thumbBox",
        //
        //    // initial image
        //    imgSrc : Meteor.user().profile.display_picture,
        //
        //    // 0 = original size
        //    // 1 = resize image based on outer container
        //    // 2 = resize image based on inner container
        //    limitOver : 2
        //
        //});

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
   //'click #rotateRight': function(e,t){
   //    rot += 90;
   //    rot = rot>360?90:rot;
   //    CanvasCrop.rotate(rot);
   //},
   //'click #rotateLeft': function(e,t){
   //    rot -= 90;
   //    rot = rot<0?270:rot;
   //    CanvasCrop.rotate(rot);
   //},
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
            console.log('Actulizando foto');
            Meteor.users.update(Meteor.userId(), {$set:{ "profile.display_picture" : imageData}});
        }

        Modal.hide('editProfile');
        Bert.alert('Perfil actualizado', 'success', 'growl-top-right');

        return false;
    }

};

AutoForm.addHooks('updateProfile',editProfileHook);
