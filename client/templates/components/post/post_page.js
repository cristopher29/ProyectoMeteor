/**
 * Created by CristoH on 10/05/2016.
 */

Template.postPage.onRendered(function(){

});

Template.postPage.helpers({

    youtubeId: function(){

        if(this.youtubeUrl){
            var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
            var match = this.youtubeUrl.match(regExp);
            if (match && match[2].length == 11) {
                return match[2];
            }
        }

    }

});