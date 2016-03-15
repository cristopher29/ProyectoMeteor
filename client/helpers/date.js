/**
 * Created by CristoH on 15/03/2016.
 */

Template.registerHelper('formatDate', function(date){
    return moment(date).format("DD-MM-YYYY");
});

Template.registerHelper('formatHour', function(date){
    return moment(date).format("HH:mm");
});