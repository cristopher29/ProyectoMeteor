/**
 * Created by CristoH on 21/04/2016.
 */
Meteor.publish('userProfileInfo', function(userId){

    if(userId && this.userId){

        var user = Meteor.users.findOne({_id: userId});

        if(user.services){
            if(user.services.twitter && !user.profile){
                console.log('Actualizando usuario con twitter');
                Meteor.users.update({_id: userId},{$set: { profile: { display_picture: user.services.twitter.profile_image_url }, username: user.services.twitter.screenName}});
                //user.profile.display_picture = user.services.twitter.profile_image_url;
                //user.username = user.services.twitter.screenName;
            }
            if(user.services.facebook && !user.profile){
                console.log('Actualizando usuario con facebook');
                Meteor.users.update({_id: userId},{$set: { profile :{ firstName: user.services.facebook.first_name, lastName: user.services.facebook.last_name }, username: user.services.facebook.first_name}});
            }
        }
        return Meteor.users.find({_id: userId}, {fields: {
            username:1,
            profile:1,
            followers:1,
            followersCount:1,
            following:1,
            followingCount:1,
            postsCount: 1,
            "services.twitter": 1,
            "services.facebook": 1
        }});
    }else{
        this.ready();
    }
});
