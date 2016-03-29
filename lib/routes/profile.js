/**
 * Created by CristoH on 21/03/2016.
 */

//SU-SU-SUSCRIBETE

Router.route('/profile/:userId', {
    name: 'userProfile',
    waitOn: function() {
        return Meteor.subscribe('user-profile', this.params.userId);
    },
    data: function() {
        return Meteor.users.findOne(this.params.userId);
    }
});

