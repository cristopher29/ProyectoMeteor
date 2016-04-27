/**
 * Created by CristoH on 15/03/2016.
 */

Template.mainLayout.events({

    'keyup .limit-200': function(){

        var remaining = 200 - jQuery('.limit-200').val().length;
        $('.countdown').text(remaining + ' caracteres restantes.');
    }
});