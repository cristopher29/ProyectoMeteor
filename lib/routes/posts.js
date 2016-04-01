/**
 * Created by CristoH on 10/01/2016.
 */


Router.route('/', {
    name: 'postsList'
});

Router.route('/posts/:_id/:slug', {
    name: 'postPage',
    waitOn: function() {
        if(Meteor.user()){
            return Meteor.subscribe('comments', this.params._id);
        }
    },
    data: function() {
        return Posts.findOne({_id: this.params._id});
    }
});

Router.route('/posts/:_id/:slug/edit', {
    name: 'postEdit',
    data: function() {
        return Posts.findOne({_id: this.params._id});
    }
});

Router.route('/submit', {
    name: 'postSubmit'
});

