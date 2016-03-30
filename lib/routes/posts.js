/**
 * Created by CristoH on 10/01/2016.
 */


Router.route('/', {
    name: 'postsList'
});

Router.route('/posts/:_id', {
    name: 'postPage',
    waitOn: function() {
        if(Meteor.user()){
            return Meteor.subscribe('comments', this.params._id);
        }
    },
    data: function() {
        return Posts.findOne(this.params._id);
    }
});

Router.route('/posts/:_id/edit', {
    name: 'postEdit',
    data: function() {
        return Posts.findOne(this.params._id);
    }
});

Router.route('/submit', {
    name: 'postSubmit'
});

