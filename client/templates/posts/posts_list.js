
Template.postsList.helpers({
  posts: function() {
    return Posts.find({}, {sort: {submitted: -1}});
  }
});

Template.postsList.onRendered(function(){
  $('#posts').isotope({
    // options
    itemSelector: '.item',
    layoutMode: 'fitRows'
  });
});