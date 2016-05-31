
Template.postItem.events({

  'click .like': function(e,t){

    e.preventDefault();

    if($.inArray(Meteor.userId(), this.usersLiked) == -1){

      t.$('.heart').removeClass('broken');
      t.$('.heart').addClass('happy');

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

      t.$('.heart').removeClass('happy');
      t.$('.heart').addClass('broken');

      Meteor.call('postDislike', this._id, Meteor.userId(), function(error, result){

        if(error){
          Bert.alert(error.reason, 'danger', 'growl-top-right');
        }
      });
    }
  },
  'click .follow': function(e,t){
    e.preventDefault();
    if(Meteor.user()){
      Meteor.call('follow',Meteor.userId(),this.userId, function(error){
        if(error){
          Bert.alert(error.reason, 'danger', 'growl-top-right');
        }
      });
    }
  },
  'click .unfollow': function(e,t){
    e.preventDefault();
    if(Meteor.user()){
      Meteor.call('unfollow',Meteor.userId(),this.userId, function(error){
        if(error){
          Bert.alert(error.reason, 'danger', 'growl-top-right');
        }
      });
    }
  }
});

Template.postItem.helpers({

  liked: function(){
    if(Meteor.user()){
      if($.inArray(Meteor.userId(), this.usersLiked) > -1){
        return 'dislike';
      }else{
        return 'like';
      }
    }
  },
  noSameUser: function(){
    if(this.userId !== Meteor.userId()){
      return true
    }
  },
  isFollower: function(){

    var user = Meteor.users.findOne({_id: this.userId});
    if(user && user.followers){
      if(user.followers.indexOf(Meteor.userId()) >= 0) {
        return true;
      } else {
        return false;
      }
    }
  },
  cardImage: function(){

    var user = Meteor.users.findOne({_id: this.userId});
    if(user && user.profile.cardImage){
      return user.profile.cardImage;
    }else{
      return '/img/card-header.jpg';
    }
  },
  userImage: function(){
    var user = Meteor.users.findOne({_id: this.userId});
    if(user && user.profile.display_picture){
      return user.profile.display_picture;
    }else{
      return '/img/no-avatar.jpg';
    }

  },
  userDescription: function(){
    var user = Meteor.users.findOne({_id: this.userId});
    if(user && user.profile.description){
      return user.profile.description;
    }else{
      return 'No hay descripción';
    }
  },
  userPosts: function(){
    var user = Meteor.users.findOne({_id: this.userId});
    if(user && user.postsCount){
      return user.postsCount;
    }else{
      return '0';
    }
  },
  userFollowers: function(){
    var user = Meteor.users.findOne({_id: this.userId});
    if(user && user.followersCount){
      return user.followersCount;
    }else{
      return '0';
    }
  },
  userFollowing: function(){
    var user = Meteor.users.findOne({_id: this.userId});
    if(user && user.followingCount){
      return user.followingCount;
    }else{
      return '0';
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

