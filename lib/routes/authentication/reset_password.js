/**
 * Created by CristoH on 27/05/2016.
 */

ResetPasswordController = RouteController.extend({

    onBeforeAction: function () {

        if (!this.params.token || this.params.token.length < 10) {
            Router.go('forgotPassword');
        }

        this.next();
    },
    data: function() {
        return {
            token: this.params.token
        };

    }


});