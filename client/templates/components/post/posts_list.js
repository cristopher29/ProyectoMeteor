



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

  instance.autorun(function(){
    instance.loaded.set(Posts.find().count());
  });
});



