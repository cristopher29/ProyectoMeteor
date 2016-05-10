

Template.postItem.events({

  'click .like': function(e,t){
    e.preventDefault();

    if($.inArray(Meteor.userId(), this.usersLiked) == -1){

      Meteor.call('postLike', this._id, Meteor.userId(), function(error, result){

        if(error){
          if(error.error == 'email-not-verified') {
            Bert.alert(error.reason, 'warning', 'growl-top-right');
          }else{
            Bert.alert(error.reason, 'danger', 'growl-top-right');
          }
        }

      });
    }
  },
  'click .dislike': function(e,t){
    e.preventDefault();

    if($.inArray(Meteor.userId(), this.usersLiked) >= 0){

      Meteor.call('postDislike', this._id, Meteor.userId(), function(error, result){

        if(error){
          Bert.alert(error.reason, 'danger', 'growl-top-right');
        }

      });
    }

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
  },
  youtubeId: function(){

    if(this.youtubeUrl){
      var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      var match = this.youtubeUrl.match(regExp);
      if (match && match[2].length == 11) {
        return match[2];
      }
    }

  }
});

