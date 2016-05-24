
Template.header.events({
    'click #logout': function(e,t){
        e.preventDefault();
        Meteor.logout();
        Router.go('postsList');
    }
});
