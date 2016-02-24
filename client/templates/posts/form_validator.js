/**
 * Created by CristoH on 16/02/2016.
 */
$.validator.setDefaults({
    rules: {
        title: {
            type: text,
            required: true,
            maxlength: 40
        },
        description: {
            required: true,
            maxlength: 200
        }
    },
    messages: {
        title: {
            required: "Campo obligatorio.",
            maxlength: "Máximo 40 caracteres"
        },
        description: {
            required: "Campo obligatorio.",
            maxlength: ""
        }
    }
});