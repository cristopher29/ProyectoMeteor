/**
 * Created by CristoH on 23/03/2016.
 */

UserProfile = new SimpleSchema({
    firstName: {
        type: String,
        optional: true,
        label: "Nombre",
        autoform:{
            afFieldInput:{
                type: "text"
            }
        }
    },
    lastName: {
        type: String,
        optional: true,
        label: "Apellido",
        autoform:{
            afFieldInput:{
                type: "text"
            }
        }
    },
    birthday: {
        type: Date,
        optional: true,
        label: "Cumpleaños",
        autoform:{
            afFieldInput:{
                type: "date"
            }
        }
    },
    gender: {
        type: String,
        allowedValues: ['Hombre', 'Mujer'],
        optional: true,
        label: "Sexo",
        autoform:{
            afFieldInput:{
                type: "select-radio"
            }
        }
    },
    website: {
        type: String,
        regEx: SimpleSchema.RegEx.Url,
        optional: true,
        label: "Sitio Web",
        autoform:{
            afFieldInput:{
                type: "text"
            }
        }
    }
});

UserSchema = new SimpleSchema({
    profile:{
        type: UserProfile,
        label: "Editar perfil",
        optional: true
    }
});

UserSchema.messages({
    required: "[label] esta vacio",
    maxString: "[label] no puede contener mas de [max] caracteres",
    badDate: "[label] no es una fecha valida",
    regEx: [
        {exp: SimpleSchema.RegEx.Url, msg: "[label] debe ser una url correcta"}
    ]

});

var whiteList = ['profile'];

Meteor.users.allow({
    update: function(userId, doc, fields, modifier){

        if(doc._id == userId && _.difference(fields, whiteList).length === 0){
            Meteor.users.update({_id: userId}, modifier);
            return true;
        }else{
            return false;
        }

    }
});