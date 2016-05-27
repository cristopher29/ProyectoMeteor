/**
 * Created by CristoH on 24/04/2016.
 */

infiniteScrollPosts = function(template){

    lastScrollTop = 0;
    $(window).scroll(function() {
        if ($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
            var scrollTop = $(this).scrollTop();
            if(scrollTop > lastScrollTop){
                if(template.loaded.get() >= template.limit.get()){
                    $('.load-more').click();
                }else{
                    return;
                }
            }
            lastScrollTop = scrollTop;
        }
    });
};

validateEmail = function(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};