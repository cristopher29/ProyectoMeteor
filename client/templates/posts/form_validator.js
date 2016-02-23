/**
 * Created by CristoH on 16/02/2016.
 */
$.validator.setDefaults({
    rules: {
        title: {
            required: true,
            maxlength: 10
        }
    },
    messages: {
        title: {
            required: "Campo obligatorio."
        }
    }
});