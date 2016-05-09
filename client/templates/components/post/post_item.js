

Template.postItem.events({
  'click .like': function(e,t){
    e.preventDefault();
    Meteor.call('postLike', this._id, Meteor.userId(), function(error, result){
      if(error) {
        Bert.alert(error.reason, 'danger', 'growl-top-right');
      }
    });
  }
});

Template.postItem.helpers({
  liked: function(){
    if($.inArray(Meteor.userId(), this.usersLiked) > -1){
      return true;
    }else{
      return false;
    }
  },
  userImage: function(){

    var user = Meteor.users.findOne({_id: this.userId});
    if(user.profile.display_picture){
      return user.profile.display_picture;
    }else{
      return '/img/no-avatar.jpg';
    }
  }
});

