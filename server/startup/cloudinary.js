/**
 * Created by CristoH on 15/04/2016.
 */

Meteor.startup(function(){
    Cloudinary.config({
        cloud_name: Meteor.settings.public.CLOUDINARY_CLOUD_NAME,
        api_key: Meteor.settings.public.CLOUDINARY_API_KEY,
        api_secret: Meteor.settings.CLOUDINARY_API_SECRET
    });
});