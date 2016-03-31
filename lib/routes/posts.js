/**
 * Created by CristoH on 10/01/2016.
 */


Router.route('/', {
    name: 'postsList'
});

Router.route('/posts/:slug', {
    name: 'postPage',
    waitOn: function() {
        if(Meteor.user()){
            return Meteor.subscribe('comments', this.params.slug);
        }
    },
    data: function() {
        return Posts.findOne({slug: this.params.slug});
    }
});

Router.route('/posts/:slug/edit', {
    name: 'postEdit',
    data: function() {
        return Posts.findOne({slug: this.params.slug});
    }
});

Router.route('/submit', {
    name: 'postSubmit'
});

