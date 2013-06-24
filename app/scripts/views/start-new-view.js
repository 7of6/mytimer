/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
], function ($, _, Backbone, JST) {
    'use strict';

    var StartNewView = Backbone.View.extend({
        template: JST['app/scripts/templates/start-new.ejs'],
        initialize: function(){
        	this.render();
        },
        events:
        {
            "click #start-button":   "onStartClick"
        },
        render: function(){
        	this.$el.html(this.template);
        },
        onStartClick: function(){
            Backbone.history.navigate("entername",true);
        }
    });

    return StartNewView;
});