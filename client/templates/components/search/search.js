/**
 * Created by CristoH on 12/05/2016.
 */

//Tracker.autorun(function () {
//    var cursor = PostsIndex.search($('#search').val()); // search all docs that contain "Marie" in the name or score field
//
//});

Template.search.helpers({
   postsIndex: function(){
       return PostsIndex;
   }
});