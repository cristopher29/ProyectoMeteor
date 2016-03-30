/**
 * Created by CristoH on 21/03/2016.
 */

Template.userProfile.helpers({
    userPosts: function(){
        return Posts.find({userId: Router.current().params.userId },{sort:{createdAt: -1}});
    }
});
