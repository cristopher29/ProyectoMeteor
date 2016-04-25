/**
 * Created by CristoH on 24/04/2016.
 */

infiniteScrollPosts = function(template){
    $(window).scroll(function() {
        if ($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
            template.handle.loadNextPage();
        }
    });
};