
Template.postsList.onCreated(function(){

  var instance = this;

  if(ActiveRoute.name('postsList')){
    Session.set('postsFilter', 'allPosts');
  }else if(ActiveRoute.name('postsTrending')){
    Session.set('postsFilter', 'postsTrending');
  }

  instance.limit = new ReactiveVar(10);
  instance.loaded = new ReactiveVar(0);
  instance.subCount = new ReactiveVar(0);
  instance.subReady = new ReactiveVar(false);

  instance.autorun(function(){

    var sub = Subsman.subscribe(Session.get('postsFilter'), instance.limit.get());
    instance.subReady.set(sub.ready());
  });

});

Template.postsList.onRendered(function(){

  var instance = this;

  infiniteScrollPosts(instance);

  instance.autorun(function(){

    if(instance.subReady.get()){

      instance.loaded.set(Posts.find().count());

    }

  });

});

Template.postsList.helpers({

  'ready': function(){
    if(Posts.find().count()>0){
      return true;
    }else{
      return false;
    }

  },

  posts: function(){
    if(ActiveRoute.name('postsList')){
      return Posts.find({},{sort :{createdAt: -1}});
    }else if(ActiveRoute.name('postsTrending')){
      return Posts.find({},{sort :{likesCount: -1, commentsCount: -1}});
    }

  }
});


Template.postsList.events({
  'click .load-more': function(){
    var actualLimit = Template.instance().limit.get();
    var newLimit = actualLimit+ 10;
    Template.instance().limit.set(newLimit);
  }
});
