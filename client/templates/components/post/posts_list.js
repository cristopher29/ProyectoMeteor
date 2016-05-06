
Template.postsList.onCreated(function(){

  var instance = this;

  instance.limit = new ReactiveVar(10);
  instance.loaded = new ReactiveVar(0);
  instance.sub = new ReactiveVar();
  instance.subReady = new ReactiveVar(false);

  instance.autorun(function(){
    var sub = Meteor.subscribe('allPosts', instance.limit.get());
    instance.subReady.set(sub.ready());
  });

});

Template.postsList.onRendered(function(){

  var instance = this;

  $grid = $('#grid');
  infiniteScrollPosts(instance);

  instance.autorun(function(){

    if(instance.subReady.get()){
      instance.loaded.set(Posts.find().count());
    }

    if(instance.loaded.get() >= 10 && ActiveRoute.name('postsList')){

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

  'noReady': function(){
    return !Template.instance().subReady.get();
  },

  posts: function(){
    return Posts.find({},{sort:{createdAt: -1}});
  }
});

