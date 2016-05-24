/**
 * Created by CristoH on 19/04/2016.
 */
//Meteor.publish('userFollowers', function(userId){
//    var user = Meteor.users.findOne({_id: userId});
//    if(user){
//        if(user.followers){
//            return Meteor.users.find({_id: {$in: user.followers}}, {fields: {
//                username:1,
//                profile:1,
//                followersCount:1,
//                followingCount:1,
//                postsCount: 1
//            }});
//        }else{
//            this.ready();
//        }
//    }
//});

Meteor.publishComposite('userFollowers', function(userId) {

    if(this.userId && userId){
        return {
            find: function() {
                return Meteor.users.find({_id: userId}, {fields: {
                    username:1,
                    profile:1,
                    followers:1,
                    followersCount:1,
                    following:1,
                    followingCount:1,
                    postsCount: 1
                }});
            },
            children: [
                {
                    find: function(user) {
                        if (user.followers) {
                            return Meteor.users.find({_id: {$in: user.followers}}, {fields: {
                                username:1,
                                profile:1,
                                followersCount:1,
                                followingCount:1
                            }});
                        }
                    }
                }

            ]
        };
    }else{
        this.ready();
    }

});