
Template.postsList.onCreated(function(){

  var instance = this;

  if(ActiveRoute.name('postsList')){
    Session.set('postsFilter', 'allPosts');
  }else if(ActiveRoute.name('postsTrending')){
    Session.set('postsFilter', 'postsTrending');
  }else if(ActiveRoute.name('postsTrendingComments')){
    Session.set('postsFilter', 'postsTrendingComments');
  }else if(ActiveRoute.name('postsTrendingLikes')){
    Session.set('postsFilter', 'postsTrendingLikes');
  }

  instance.limit = new ReactiveVar(10);
  instance.loaded = new ReactiveVar(0);
  instance.subReady = new ReactiveVar(false);


  instance.autorun(function(){

    var sub = instance.subscribe(Session.get('postsFilter'), instance.limit.get());
    instance.subReady.set(sub.ready());

    if(instance.subReady.get()){

      instance.loaded.set(Posts.find().count());

    }

  });

});

Template.postsList.onRendered(function(){

  var instance = this;
  infiniteScrollPosts(instance);

});

Template.postsList.helpers({

  userLoginIn: function(){
    if(Meteor.user()){
      return 'col-md-8';
    }else{
      return 'col-md-12 no-login-container';
    }
  },

  morePosts: function(){
    return (Template.instance().loaded.get() >= Template.instance().limit.get());
  },

  posts: function(){
    if(ActiveRoute.name('postsList')){
      return Posts.find({},{sort :{createdAt: -1}});
    }else if(ActiveRoute.name('postsTrending')){
      return Posts.find({},{sort :{likesCount: -1, commentsCount: -1}});
    }else if(ActiveRoute.name('postsTrendingComments')){
      return Posts.find({},{sort :{commentsCount: -1}});
    }else if(ActiveRoute.name('postsTrendingLikes')){
      return Posts.find({},{sort :{likesCount: -1}});
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
