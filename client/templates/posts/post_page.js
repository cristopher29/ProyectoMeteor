/**
 * Created by CristoH on 10/03/2016.
 */

Template.postPage.helpers({
    comments: function() {
        return Comments.find({postId: this._id}, {sort: {createdAt: -1}});
    }
});