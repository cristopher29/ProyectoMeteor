/**
 * Created by CristoH on 07/04/2016.
 */


//Funcion para sanitizar el html
sanitize = function(html){

    return sanitizeHtml(html, {
        allowedTags: [ 'b', 'i', 'u', 'strong', 'font','strike','span','div', 'p' ],
        allowedAttributes: {
            '*': [ 'color','style' ]
        }
    });
};

//Funcion para comprobar que el usuario exista
checkUser = function(userId){

    var userExist = Meteor.users.findOne({_id: userId});

    if(userExist){
        return true;
    }else{
        return false;
    }

};

