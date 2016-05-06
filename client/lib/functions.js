/**
 * Created by CristoH on 24/04/2016.
 */

infiniteScrollPosts = function(template){

    $(window).scroll(function() {
        if ($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
            if(template.loaded.get() >= template.limit.get()){
                var actualLimit = template.limit.get();
                var newLimit = actualLimit+ 10;
                console.log(actualLimit + ''+ newLimit);
                template.limit.set(newLimit);
            }else{
                return;
            }

        }
    });


};