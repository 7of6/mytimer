/*global require*/
'use strict';

require.config({
    shim: {
        underscore: {
            exports: '_'
        },
        hammer: {
            deps:[
                'jquery'
            ],
            exports: 'Hammer'
        },
        pageslider: {
            deps:[
                'jquery'
            ],
            exports: 'PageSlider'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery',
                'pageslider'
            ],
            exports: 'Backbone'
        },
        
    },
    paths: {
        jquery: '../bower_components/jquery/jquery',
        hammer: '../scripts/vendor/jquery.hammer.min',
        pageslider: '../scripts/vendor/pageslider',
        backbone: '../bower_components/backbone-amd/backbone',
        underscore: '../bower_components/underscore-amd/underscore',
    }
});

require([
    'backbone',
    'routes/application-router',
], function (Backbone, AppRouter) {
    new AppRouter();
    Backbone.history.start();
});