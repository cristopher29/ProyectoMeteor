
Template.postsList.onCreated(function(){

  var instance = this;

  instance.loaded = new ReactiveVar(0);
  instance.autorun(function(){

    instance.handle = Meteor.subscribeWithPagination('allPosts', 10);

  });

});

Template.postsList.onRendered(function(){

  var instance = this;
  infiniteScrollPosts(instance);

  $grid = $('#grid');

  instance.autorun(function(){

    instance.loaded.set(Posts.find().count());

    if(Posts.find().count() >= 10 && ActiveRoute.name('postsList')){

      Tracker.afterFlush(function() {
        //Deberia de ejecutarse cuando el child template este renderizado
        Meteor.setTimeout(function(){
          $grid.isotope({
            resizable: false,
            itemSelector: '.grid-item',
            transformsEnabled: false,
            masonry: {
              columnWidth: 350,
              isFitWidth: true
            }
          });
        }, 200);

      });
    }

  });

});

Template.postsList.helpers({
  posts: function(){
    return Posts.find({},{sort:{createdAt: -1}});
  }
});

