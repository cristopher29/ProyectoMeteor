/**
 * Created by CristoH on 23/03/2016.
 */

UserProfile = new SimpleSchema({
    display_picture:{
        type: String,
        optional: true,
        label: "Imagen",
        autoform: {
            afFieldInput:{
                type: "file"
            }
        }
    },
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
            type: 'select-radio',
            options: {
                Hombre: "Hombre",
                Mujer: "Mujer"
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
    username: {
        type: String
    },
    emails: {
        type: Array
    },
    "emails.$": {
        type: Object
    },
    "emails.$.address": {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    "emails.$.verified": {
        type: Boolean
    },
    createdAt: {
        type: Date
    },
    profile:{
        type: UserProfile,
        label: " ",
        optional: true
    },
    services: {
        type: Object,
        optional: true,
        blackbox: true
    },
    followers:{
        type: [String],
        optional: true
    },
    followersCount:{
        type: Number,
        optional: true
    },
    following:{
        type: [String],
        optional: true
    },
    followingCount:{
        type: Number,
        optional: true
    }
});

Meteor.users.attachSchema(UserSchema);

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
    update: function(userId, user, fields, modifier){

        if(user._id == userId && _.difference(fields, whiteList).length === 0){
            Meteor.users.update({_id: userId}, modifier);
            return true;
        }else{
            return false;
        }

    }
});