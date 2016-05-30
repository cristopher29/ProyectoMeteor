
Template.backToTop.events({
    'click .back-to-top': function(e,t){
        e.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, 700);
    }
});

Template.backToTop.onRendered(function() {

    $(window).scroll(function() {
        if ( $(window).scrollTop() > 300 ) {
            $('a.back-to-top').fadeIn('slow');
        } else {
            $('a.back-to-top').fadeOut('slow');
        }
    });

});

