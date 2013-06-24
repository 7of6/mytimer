/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
], function ($, _, Backbone, JST) {
    'use strict';

    var EnterNameView = Backbone.View.extend({
        template: JST['app/scripts/templates/enter-name.ejs'],
        initialize: function(){
        },
        events:
        {
            "keypress input": "onKeyPress"
        },
        render: function(){
            this.$el.html(this.template);
        },
        onKeyPress: function(e){
            if (e.keyCode === 13){
                this.onSubmit();
            }
        },
        onSubmit: function(){
            
            var formVal = $("input[name=timer-name-input]").val().trim().toUpperCase();
            this.model.set({title:formVal});

            Backbone.history.navigate("setinterval", true);
        }
    });

    return EnterNameView;
});