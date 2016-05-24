/**
 * Created by CristoH on 13/05/2016.
 */

//Meteor.publish("searchPosts", function(searchValue) {
//    if (!searchValue) {
//        return this.ready();
//    }
//    return Messages.find(
//        { $text: {$search: searchValue} },
//        {
//            // `fields` is where we can add MongoDB projections. Here we're causing
//            // each document published to include a property named `score`, which
//            // contains the document's search rank, a numerical value, with more
//            // relevant documents having a higher score.
//            fields: {
//                score: { $meta: "textScore" }
//            },
//            // This indicates that we wish the publication to be sorted by the
//            // `score` property specified in the projection fields above.
//            sort: {
//                score: { $meta: "textScore" }
//            }
//        }
//    );
//});