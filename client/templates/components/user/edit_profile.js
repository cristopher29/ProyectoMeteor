/**
 * Created by CristoH on 11/04/2016.
 */

var editProfileHook = {
    onSuccess: function(){

        var image = $('#upload-file')[0].files[0];
        if(image){
            var imageData = CanvasCrop.getDataURL("jpeg");

            if(imageData !== null){
                Meteor.users.update(Meteor.userId(), {$set:{ "profile.display_picture" : imageData}});
            }
        }
        Modal.hide('editProfile');
        Bert.alert('Perfil actualizado', 'success', 'growl-top-right');

        return false;
    }

};

AutoForm.addHooks('updateProfile',editProfileHook);

Template.editProfile.onRendered(function(){

    Meteor.defer(function(){
        if(Meteor.user().profile.display_picture !== null){
            rot = 0;
            ratio = 1;
            CanvasCrop = $.CanvasCrop({

                // outercontainer
                cropBox : ".imageBox",

                // inner container
                thumbBox : ".thumbBox",

                // initial image
                imgSrc : Meteor.user().profile.display_picture,

                // 0 = original size
                // 1 = resize image based on outer container
                // 2 = resize image based on inner container
                limitOver : 2

            });

        }else{
            rot = 0;
            ratio = 1;
            CanvasCrop = $.CanvasCrop({
                cropBox : ".imageBox",
                thumbBox : ".thumbBox",
                limitOver : 0
            });
        }
    });

});


Template.editProfile.events({
   'change #upload-file': function(e,t){
       var reader = new FileReader();
       reader.onload = function(e){
           CanvasCrop = $.CanvasCrop({
               cropBox : ".imageBox",
               imgSrc : e.target.result,
               limitOver : 2
           });
           rot =0 ;
           ratio = 1;
       };
       var files = e.target.files;
       reader.readAsDataURL(files[0]);
       files = [];
   },
   'click #rotateRight': function(e,t){
       rot += 90;
       rot = rot>360?90:rot;
       CanvasCrop.rotate(rot);
   },
   'click #rotateLeft': function(e,t){
       rot -= 90;
       rot = rot<0?270:rot;
       CanvasCrop.rotate(rot);
   },
   'click #zoomIn': function(e,t){
       ratio =ratio*1.1;
       CanvasCrop.scale(ratio);
   },
   'click #zoomOut': function(e,t){
       ratio =ratio*0.9;
       CanvasCrop.scale(ratio);
   }
});
