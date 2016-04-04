/**
 * Created by CristoH on 21/03/2016.
 */

Router.route('/profile/:userId', {
    name: 'userProfile',
    waitOn: function() {
        if(Meteor.user()){
            return Meteor.subscribe('userProfile', this.params.userId);
        }
    },
    data: function() {
        return Meteor.users.findOne(this.params.userId);
    }
});

