/**
 * Created by CristoH on 24/04/2016.
 */

infiniteScrollPosts = function(template){

    console.log('Funcion iniciada : InfiniteScroll');
    $(window).scroll(function() {
        if ($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
            if(template.loaded.get() >= template.limit.get()){
                template.handle.loadNextPage();
                console.log('Cargados:' + template.loaded.get());
                var actualLimit = template.limit.get();
                var newLimit = actualLimit + 10;
                template.limit.set(newLimit);
                console.log('Nuevo limite '+template.limit.get());
                console.log('Cargados:' + template.loaded.get());
            }else{
                console.log('Finalizado');
                return;
            }

        }
    });


};