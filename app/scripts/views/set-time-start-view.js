/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/selector-view',
], function ($, _, Backbone, JST, SelectorView) {
    'use strict';

    var SetTimeStartView = Backbone.View.extend({
        template: JST['app/scripts/templates/set-time-start.ejs'],
        initialize: function(){
        },
        events:
        {
            "click #use-current-button": "onUseCurrent"
        },
        render: function(){

            this.$el.html(this.template);
            this.$el.find("#title").html(this.model.get("title"));
            this.addSelector();
        },
        addSelector: function(){
            this.selectorView = new SelectorView();
            this.selectorView.render(this.$el.find("#selector"), this.$el.find("#display"), "#ff9933", 23, "hours");
        },
        initSelector: function(){
            this.selectorView.updateOffset();
        },
        onUseCurrent: function(){
            this.model.set({starttime:this.selectorView.getValue()});
            Backbone.history.navigate("setduration", true);
        }
    });

    return SetTimeStartView;
});