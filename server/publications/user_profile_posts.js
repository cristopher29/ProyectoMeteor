/**
 * Created by CristoH on 29/04/2016.
 */

Meteor.publish('userProfilePosts', function(userId, limit) {

    var exist = Meteor.users.findOne({_id: userId});

    if(exist){
        return Posts.find({userId: userId}, {limit: limit, sort:{createdAt: -1}});
    }else{
        this.ready();
    }

});