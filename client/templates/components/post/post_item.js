
Template.postItem.onRendered(function(){
  $("a#post_image").fancybox();
});


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

  }
});

Template.postItem.helpers({
  liked: function(){
    if($.inArray(Meteor.userId(), this.usersLiked) > -1){
      return 'dislike';
    }else{
      return 'like';
    }
  },
  cardImage: function(){

    var user = Meteor.users.findOne({_id: this.userId});
    if(user.profile.cardImage){
      return user.profile.cardImage;
    }else{
      return '/img/card-header.jpg';
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
  userDescription: function(){

    var user = Meteor.users.findOne({_id: this.userId});
    if(user.profile.description){
      return user.profile.description;
    }else{
      return 'No hay descripción';
    }
  },
  userPosts: function(){

    var user = Meteor.users.findOne({_id: this.userId});
    if(user.postsCount){
      return user.postsCount;
    }else{
      return '0';
    }
  },
  userFollowers: function(){

    var user = Meteor.users.findOne({_id: this.userId});
    if(user.followersCount){
      return user.followersCount;
    }else{
      return '0';
    }
  },
  userFollowing: function(){

    var user = Meteor.users.findOne({_id: this.userId});
    if(user.followingCount){
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

