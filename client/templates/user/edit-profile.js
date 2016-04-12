/**
 * Created by CristoH on 11/04/2016.
 */

var editProfileHook = {
    onSuccess: function(){
        var imageData = $('#image-cropper').cropit('export');
        if(imageData !== null){
            Meteor.users.update(Meteor.userId(), {$set:{ "profile.display_picture" : imageData}});
        }
        Modal.hide('editProfile');
    }

};

AutoForm.addHooks('updateProfile',editProfileHook);

Template.editProfile.onRendered(function(){

    if(Meteor.user().profile.display_picture !== null){

        $('#image-cropper').cropit({
            imageState: {
                src: Meteor.user().profile.display_picture
            },
            onZoomDisabled: function(){
                $('.cropit-image-zoom-input').removeAttr("disabled");
            }
        });
    }else{
        $('#image-cropper').cropit();
    }


});
