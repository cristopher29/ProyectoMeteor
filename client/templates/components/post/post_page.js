/**
 * Created by CristoH on 10/05/2016.
 */

Template.postPage.onRendered(function(){

    $("#shareIcons").jsSocials({
        showLabel: false,
        showCount: false,
        shareIn: "popup",
        shares: ["twitter", "facebook", "googleplus", "pinterest"]
    });
});


Template.postPage.events({

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

Template.postPage.helpers({

    liked: function(){
        if(Meteor.user()){
            if($.inArray(Meteor.userId(), this.usersLiked) > -1){
                return 'dislike';
            }else{
                return 'like';
            }
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

    },
    NoImageOrVideo: function(){
        if(this.youtubeUrl || this.image){
            return 'col-md-6'
        }else{
            return 'col-xs-12'
        }
    }

});