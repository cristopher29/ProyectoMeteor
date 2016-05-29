/**
 * Created by CristoH on 29/05/2016.
 */

UserProfileEditController = RouteController.extend({

    onAfterAction: function(){

        SEO.set({
            title: 'Editar perfil',
            og: {
                'title': 'Editar perfil'
            }
        });

    }

});