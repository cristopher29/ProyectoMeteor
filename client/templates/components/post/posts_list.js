Template.postsList.onCreated(function(){

  var instance = this;

  instance.autorun(function(){

    instance.handle = Meteor.subscribeWithPagination('allPosts', 10);

  });

});

Template.postsList.onRendered(function(){
  infiniteScrollPosts(this);
});


Template.postsList.helpers({
  posts: function() {
    return Posts.find();
  }
});

