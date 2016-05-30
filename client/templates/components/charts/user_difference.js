Template.userDifference.helpers({
    usersChart: function(){

        var currentUser = Meteor.user();
        var profileUser = Meteor.users.findOne({_id: Router.current().params.userId});

        return {
            chart: {
                polar: true,
                type: 'line'
            },

            title: {
                text: 'Tú vs '+profileUser.username,
                x: -80
            },

            pane: {
                size: '80%'
            },

            xAxis: {
                categories: ['Posts', 'Seguidores', 'Siguiendo'],
                tickmarkPlacement: 'on',
                lineWidth: 0
            },

            yAxis: {
                gridLineInterpolation: 'polygon',
                lineWidth: 0,
                min: 0
            },

            tooltip: {
                shared: true,
                pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:,.0f}</b><br/>'
            },

            legend: {
                align: 'right',
                verticalAlign: 'top',
                y: 70,
                layout: 'vertical'
            },

            series: [{
                name: 'Tú',
                data: [currentUser.postsCount, currentUser.followersCount, currentUser.followingCount],
                pointPlacement: 'on'
            }, {
                name: profileUser.username,
                data: [profileUser.postsCount, profileUser.followersCount, profileUser.followingCount],
                pointPlacement: 'on'
            }]
        }
    }
});

Template.userDifference.events({
 //add your events here
});

Template.userDifference.onCreated(function() {
    //add your statement here
});

Template.userDifference.onRendered(function() {
    //add your statement here
});

Template.userDifference.onDestroyed(function() {
    //add your statement here
});

