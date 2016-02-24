/**
 * Created by cristoh on 23/02/16.
 */

PostSchema = new SimpleSchema({
    title: {
        type: String,
        label: "Título",
        max: 20,
        regEx: /^[a-z0-9]+$/i
    },
    description:{
        type: String,
        label: "Descripción",
        max: 200
    }
});