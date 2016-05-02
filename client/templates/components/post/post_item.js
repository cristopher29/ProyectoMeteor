Template.postItem.onRendered(function () {

  $('.post-avatar').each(function() {
    var avatar = $(this),
        avatarWatcher = scrollMonitor.create(avatar.parent(), {
          top: 69,
          bottom: -avatar.height() - 50
        });

    avatarWatcher.stateChange(function() {
      if (avatarWatcher.isInViewport) {
        if (avatarWatcher.isInViewport && avatarWatcher.isAboveViewport) {
          avatar.removeClass('post-avatar--absolute').addClass('post-avatar--fixed');
          $(".post-avatar--fixed").css("margin-left", function() { return $(document).width()-40 - $(document).width() });
        } else if (!avatarWatcher.isAboveViewport) {
          avatar.removeClass('post-avatar--absolute').removeClass('post-avatar--fixed');
          $(".post-avatar--fixed").css("margin-left", '');
        }
      } else {
        avatar.removeClass('post-avatar--fixed').addClass('post-avatar--absolute');
      }
    });
  });
});

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

