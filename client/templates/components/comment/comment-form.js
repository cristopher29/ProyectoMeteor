/**
 * Created by CristoH on 20/03/2016.
 */

var commentHook = {
    onSubmit: function(insertDoc, updateDoc, currentDoc){
        Meteor.call('commentInsert', insertDoc, currentDoc , function(error, result) {
            if (error){
                Bert.alert(error.reason,'danger','growl-top-right');
                $('#comentar').removeAttr('disabled');
                return;
            }
            if(result.emailNotVerified) {
                Bert.alert('Verifica tu email','warning','growl-top-right');
                $('#comentar').removeAttr('disabled');
                return;
            }
            $('.limit-200').val('');
            $('#comentar').removeAttr('disabled');
        });
    }
};

AutoForm.addHooks('insertComment', commentHook);

Template.commentForm.events({

    'focus .limit-200, keypress': function(e){
        if(e.which == 13) {
            $('#comentar').click();
            $('.limit-200').val('');
            e.preventDefault();
        }
    },
    'submit form': function(e){
        e.preventDefault();
    }
});