/**
 * Created by CristoH on 25/04/2016.
 */

Template.notFound.onRendered(function(){
    $('.container .row .col-md-6').addClass('remove-md');
    $('.container').addClass('remove-md');
});

Template.notFound.onDestroyed(function(){
    $('.container .row .col-md-6').removeClass('remove-md');
    $('.container').removeClass('remove-md');
});