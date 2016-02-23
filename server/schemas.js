/**
 * Created by cristoh on 23/02/16.
 */

PostSchema = new SimpleSchema({
    title: {
        type: String,
        label: "Título",
        max: 20
    },
    shortDescription:{
        type: String,
        label: "Descripción corta",
        max: 30
    },
    description:{
        type: String,
        label: "Descripción",
        max: 200
    }
});