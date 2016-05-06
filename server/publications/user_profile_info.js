/**
 * Created by CristoH on 21/04/2016.
 */
Meteor.publish('userProfileInfo', function(userId){

    if(userId){
        return Meteor.users.find({_id: userId}, {fields: {
            username:1,
            profile:1,
            followers:1,
            followersCount:1,
            following:1,
            followingCount:1,
            postsCount: 1
        }});
    }

});
