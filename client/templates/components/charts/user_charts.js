Template.userCharts.helpers({
    usersChart: function(){
        return {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false
            },
            title: {
                text: "User charts"
            },
            tooltip: {
                pointFormat: '<b>{point.percentage:.1f}%</b><img width=20 src="http://66.media.tumblr.com/fb0d30d34746510ca3f60853bcb04be1/tumblr_o7x0fmgoj61rpwm80o1_250.jpg"/>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b> <img width="20" src="http://66.media.tumblr.com/fb0d30d34746510ca3f60853bcb04be1/tumblr_o7x0fmgoj61rpwm80o1_250.jpg"> : {point.percentage:.1f} %',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        },
                        connectorColor: 'silver'
                    }
                }
            },
            series: [{
                type: 'pie',
                name: 'genre',
                data: [
                    ['Adventure',   45.0],
                    ['Action',       26.8],
                    ['Ecchi',   12.8],
                    ['Comedy',    8.5],
                    ['Yuri',     6.2]
                ]
            }]
        }
    }
});

Template.userCharts.events({
 //add your events here
});

Template.userCharts.onCreated(function() {
    //add your statement here
});

Template.userCharts.onRendered(function() {
    //add your statement here
});

Template.userCharts.onDestroyed(function() {
    //add your statement here
});

