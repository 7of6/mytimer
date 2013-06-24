/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/selector-view',
], function ($, _, Backbone, JST, SelectorView) {
    'use strict';

    var SetIntervalView = Backbone.View.extend({
        template: JST['app/scripts/templates/set-interval.ejs'],
        initialize: function(){
        },
        events:
        {
            "click #next-button": "onNext"
        },
        render: function(){

        	this.$el.html(this.template);
            this.$el.find("#title").html(this.model.get("title"));
            this.addSelector();
        },
        addSelector: function(){

            if (!this.selectorView){
                this.selectorView = new SelectorView();
                this.selectorView.render(this.$el.find("#selector"), this.$el.find("#display"), "#33CC99", 24, "hours");
            }

        },
        initSelector: function(){
            this.selectorView.updateOffset();
        },
        onNext: function(){
            this.model.set({interval:this.selectorView.getValue()});
            Backbone.history.navigate("settimestart", true);
        }
    });

    return SetIntervalView;
});