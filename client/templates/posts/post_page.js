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
                $('.textarea-comentario').val('');
                $('#comentar').removeAttr('disabled');
            }
        });
    }
};

AutoForm.addHooks('insertComment', commentHook);

Template.postPage.events({

    'focus .textarea-comentario': function(){

        var limit = 200;

        $('.textarea-comentario').on('change keydown paste', function(){

            var remaining = limit - $('.textarea-comentario').val().length;
            var textarea = $('.countdown');
            textarea.text(remaining + ' caracteres restantes.');
            if(remaining<0){
                textarea.css('color','red');
                $('#comentar').attr('disabled','disabled');
            }else{
                textarea.css('color','black');
                $('#comentar').removeAttr('disabled');
            }
        });
    },

    'submit form': function(e){
        e.preventDefault();
    }
});

Template.postPage.helpers({
    comments: function() {
        return Comments.find({postId: this._id});
    }
});