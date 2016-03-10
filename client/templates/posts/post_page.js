/**
 * Created by CristoH on 10/03/2016.
 */
var commentHook = {

    onSubmit: function(insertDoc, updateDoc, currentDoc){
        Meteor.call('commentInsert', insertDoc, currentDoc , function(error, commentId) {
            if (error){
                Bert.alert(error.reason,'danger','growl-top-right');
                $('#comentar').removeAttr('disabled');
            } else {
                $('.textarea-comentario').text('');
                $('#comentar').removeAttr('disabled');
            }
        });
    }

};
AutoForm.addHooks('insertComment', commentHook);

Template.postPage.events({
    'submit form': function(e){
        e.preventDefault();
    }
});