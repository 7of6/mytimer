/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/selector-view',
], function ($, _, Backbone, JST, SelectorView) {
    'use strict';

    var SetDurationView = Backbone.View.extend({
        template: JST['app/scripts/templates/set-duration.ejs'],
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
            this.selectorView = new SelectorView();
            this.selectorView.render(this.$el.find("#selector"), this.$el.find("#display"), "#ff3333", 30, "days");
        },
        initSelector: function(){
            this.selectorView.updateOffset();
        },
        onNext: function(){
            this.model.set({duration:this.selectorView.getValue()});
            Backbone.history.navigate("timercomplete", true);
        }
    });

    return SetDurationView;
});