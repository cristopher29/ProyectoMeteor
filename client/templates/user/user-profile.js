/**
 * Created by CristoH on 21/03/2016.
 */

Template.userProfile.events({
    'click .btn-pref .btn': function(e,t){
        e.preventDefault();
        $(".btn-pref .btn").removeClass("btn-primary").addClass("btn-default");
        $(e.currentTarget).removeClass("btn-default").addClass("btn-primary");


    }
});