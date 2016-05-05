/**
 * Created by CristoH on 05/05/2016.
 */

Meteor.publish('recommendations', function(){
    if(this.userId){
        var count = Meteor.users.find().count();
        var users = [];

        for(var i=0;i< 6;i++){

            var random = Math.floor((Math.random() * count));

            var user = Meteor.users.findOne({},{skip: random});

            users.push(user._id);
        }

        return Meteor.users.find({_id:{$in:users}},{limit: 4, fields: {
            username:1,
            profile:1,
            followersCount:1,
            followingCount:1
        }});
    }
});