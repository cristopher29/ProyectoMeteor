/**
 * Created by CristoH on 15/03/2016.
 */

Template.mainLayout.events({

    'keyup .limit-200': function(){

        var remaining = 200 - $('.limit-200').val().length;
        $('.countdown').text(remaining + ' caracteres restantes.');
    }
});

Template.mainLayout.events({

    'keyup .comment-edit-input': function(){

        var remaining = 200 - $('.comment-edit-input').val().length;
        $('.countdownEdit').text(remaining + ' caracteres restantes.');
    }
});