/**
 * Created by CristoH on 24/04/2016.
 */

infiniteScrollPosts = function(template){
    $(window).scroll(function() {
        if ($(window).scrollTop() + $(window).height() > $(document).height() - 100) {

            var postCount = Posts.find().count();
            var actualLimit = template.limit.get();
            var limit = actualLimit + 5;
            if(postCount+5 >= limit){
                template.limit.set(Number(limit));
            }
        }
    });
};