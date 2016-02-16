Template.postItem.helpers({
  ownPost: function() {
    return this.userId === Meteor.userId();
  }
});