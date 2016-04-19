/**
 * Created by CristoH on 30/03/2016.
 */


Template.userProfilePost.events({
    'click .like': function(){
        Meteor.call('postLike', this._id, Meteor.userId(), function(error, result){
            if(error){
                Bert.alert(error.reason, 'danger', 'growl-top-right');
                return;
            }
            if(result.like){
                Bert.alert('Like', 'success', 'growl-top-right');
            }
            if(result.unlike){
                Bert.alert('Unlike', 'success', 'growl-top-right');
            }
        });
    }
});

Template.userProfilePost.helpers({
    liked: function(){
        if(this.usersLiked.indexOf(Meteor.userId()) > -1){
            return true;
        }
        if(this.usersLiked.indexOf(Meteor.userId()) == -1){
            return false;
        }
    },
    userPosts: function(){
        return Posts.find({userId: Router.current().params.userId },{sort:{createdAt: -1}});
    }
});