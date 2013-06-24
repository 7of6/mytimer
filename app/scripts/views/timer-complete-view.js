/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
], function ($, _, Backbone, JST) {
    'use strict';

    var TimerCompleteView = Backbone.View.extend({
        template: JST['app/scripts/templates/timer-complete.ejs'],
        initialize: function(){
        },
        events:
        {
            "keypress input": "onKeyPress"
        },
        render: function(){
        	this.$el.html(this.template);
            this.$el.find("#title").html(this.model.get("title"));

            this.$el.find("#interval").find(".value").html(this.model.get("interval") + "hrs");
            this.$el.find("#start").find(".value").html(this.model.get("starttime"));
            this.$el.find("#duration").find(".value").html(this.model.get("duration") + "days");
        
        },
        onKeyPress: function(e){
            if (e.keyCode === 13){
                this.onSubmit();
            }
        },
        onSubmit: function(){
            console.log("submit");
            Backbone.history.navigate("setinterval", true);
        }
    });

    return TimerCompleteView;
});