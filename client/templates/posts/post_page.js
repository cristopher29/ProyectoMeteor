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
                $('.limit-200').val('');
                $('#comentar').removeAttr('disabled');
            }
        });
    }
};

AutoForm.addHooks('insertComment', commentHook);

Template.postPage.events({

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

Template.postPage.helpers({
    comments: function() {
        return Comments.find({postId: this._id}, {sort: {createdAt: -1}});
    }
});