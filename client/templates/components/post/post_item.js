

Template.postItem.events({
  'click .like': function(){
      Meteor.call('postLike', this._id, Meteor.userId(), function(error, result){
        if(error){
          Bert.alert(error.reason, 'danger', 'growl-top-right');
          return;
        }
        if(result.like){
          console.log('like');
        }
        if(result.dislike){
          console.log('dislike');
        }
      });
  }
});

Template.postItem.helpers({
  'userImage': function(){
    var user = Meteor.users.findOne({_id: this.userId});
    return user.profile.display_picture;
  },
  liked: function(){
    if(this.usersLiked.indexOf(Meteor.userId()) > -1){
      return true;
    }
    if(this.usersLiked.indexOf(Meteor.userId()) == -1){
      return false;
    }
  }
});

