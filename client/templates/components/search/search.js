/**
 * Created by CristoH on 12/05/2016.
 */



//Template.search.onCreated(function(){
//
//    var instance = this;
//
//    instance.limit = new ReactiveVar(10);
//    instance.searchValue = new ReactiveVar();
//    instance.subReady = new ReactiveVar(false);
//
//    instance.autorun(function(){
//
//        var sub = Meteor.subscribe('searchPosts', instance.searchValue.get());
//        instance.subReady.set(sub.ready());
//    });
//
//});

Template.search.onRendered(function(){

    var instance = this;

    $('.suggestions').hide();

    $(document).mouseup(function (e)
    {
        var container = $('.suggestions');

        if(!container.is(e.target) && container.has(e.target).length === 0){
            container.hide();
        }

    });

    //var results = [];
    //instance.autorun(function(){
    //
    //    if(instance.subReady.get()){
    //
    //        var posts = Posts.find({},{ sort: [['score', 'desc']] });
    //
    //        $.each(posts, function( key, value ) {
    //            results[key] = value.title;
    //        });
    //    }
    //});
    //
    //$('#search-box').autocomplete({
    //    lookup: results,
    //    onSelect: function (suggestion) {
    //        alert('You selected: ' + suggestion.title);
    //    }
    //});
});

Template.search.helpers({
   //posts: function(){
   //    if(Template.instance().subReady.get() && Template.instance().searchValue.get()){
   //        return Posts.find({}, { sort: [['score', 'desc']] , limit: 5});
   //    }
   //}
    searchIndexes: function(){
        return [UsersIndex, PostsIndex]
    },
    usersIndex: function(){
        return UsersIndex;
    },
    postsIndex: function(){
        return PostsIndex;
    },
    inputAttributes: function () {
        return {'id': 'search-box', 'class': 'suggest-prompt form-control', 'placeholder': i18n('search'), 'autocomplete': 'off' };
    }
});

Template.search.events({
   'keyup #search-box': function(e,t){
       e.preventDefault();
       //var query = $('#search-box').val();
       //if(query){
       //    Template.instance().searchValue.set(query);
       //}else{
       //    Template.instance().searchValue.set(false);
       //}
       if($('#search-box').val()){
           $('.suggestions').show();
       }else{
           $('.suggestions').hide();
       }
   },
   'submit #search': function(e,t){
       e.preventDefault();
   }
});

Template.postSuggestions.events({
    'click .postSugg': function(){
        $('.suggestions').hide();
        $('#search-box').val(this.title);
        Router.go('postPage', {_id: this.__originalId, slug: this.slug});
    }
});

Template.userSuggestions.events({
    'click .userSugg': function(){
        $('.suggestions').hide();
        $('#search-box').val(this.username);
        Router.go('userProfile', {userId: this.__originalId});
    }
});

