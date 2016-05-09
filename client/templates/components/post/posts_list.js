
Template.postsList.onCreated(function(){

  var instance = this;

  instance.limit = new ReactiveVar(10);
  instance.loaded = new ReactiveVar(0);
  instance.subCount = new ReactiveVar(0);
  instance.subReady = new ReactiveVar(false);

  instance.autorun(function(){
    var sub = Subsman.subscribe('allPosts', instance.limit.get());
    instance.subReady.set(sub.ready());
  });

});

Template.postsList.onRendered(function(){

  var instance = this;

  infiniteScrollPosts(instance);

  instance.autorun(function(){

    if(instance.subReady.get()){

      instance.loaded.set(Posts.find().count());
      instance.subCount.set(1);

      if(Router.current().route.getName() === 'postsList'){

        Tracker.afterFlush(function() {
          //Deberia de ejecutarse cuando el child template este renderizado
          $('#grid').isotope({
            resizable: false,
            itemSelector: '.grid-item',
            transformsEnabled: false,
            masonry: {
              columnWidth: 350,
              isFitWidth: true
            }
          });
          //Meteor.setTimeout(function(){
          //
          //}, 50);
        });
      }

    }

  });

});

Template.postsList.helpers({

  'ready': function(){
    if(Template.instance().subCount.get() == 1){
      return true;
    }else{
      return Template.instance().subReady.get();
    }

  },

  posts: function(){
    return Posts.find({},{sort :{createdAt: -1}});
  }
});


Template.postsList.events({
  'click .load-more': function(){
    var actualLimit = Template.instance().limit.get();
    var newLimit = actualLimit+ 10;
    Template.instance().limit.set(newLimit);
  }
});
