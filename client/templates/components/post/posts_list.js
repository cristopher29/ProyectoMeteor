Template.postsList.onCreated(function(){

  var instance = this;

  instance.limit = new ReactiveVar(10);

  instance.autorun(function(){

    var limit = instance.limit.get();

    console.log("Obteniendo "+limit+" posts…");

    var subscription = instance.subscribe('allPosts', limit);

    if (subscription.ready()) {
      console.log("> Suscripcion lista");
    } else {
      console.log("> Suscripcion no lista");
    }

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

