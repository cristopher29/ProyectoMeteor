/**
 * Created by CristoH on 11/04/2016.
 */

var editProfileHook = {

    onSuccess: function(){
        Modal.hide('editProfile');
    }

};

AutoForm.addHooks('updateProfile',editProfileHook);

Template.editProfile.onRendered(function(){
    $('#image-cropper').cropit();
});