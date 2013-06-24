/*global define*/

define([
    'jquery',
    'backbone',
    'pageslider',

    'views/start-new-view',
    'views/enter-name-view',
    'views/set-interval-view',
    'views/set-time-start-view',
    'views/set-duration-view',
    'views/timer-complete-view',

    'collections/timer-collection',
    'models/timer-model',

], function (
	$, 
	Backbone, 
	PageSlider,

	StartNewView, 
	EnterNameView, 
	SetIntervalView, 
	SetTimeStartView,
	SetDurationView,
	TimerCompleteView,

	Timers, 
	Model
	) {
    'use strict';

    var ApplicationRouter = Backbone.Router.extend({

    	initialize: function(){
    		// temporary holding while creating a timer
    		this.tempModel = new Model();
    		// sliding mechanism
    		this.slider = new PageSlider($('#layout'));
    	},

        routes: {
        	"" : "startnew",
        	"entername" : "entername",
        	"setinterval" : "setinterval",
        	"settimestart" : "settimestart",
        	"setduration" : "setduration",
        	"timercomplete" : "timercomplete",
        },


        startnew : function(){
           	if (!this.startNewView) {
	            this.startNewView = new StartNewView();
	        } else {
	            console.log('reusing home view');
	            this.startNewView.delegateEvents();
	        }
	        this.slider.slidePage(this.startNewView.$el);

        },

        entername : function(){
        	this.enterNameView = new EnterNameView({model:this.tempModel});
        	this.slider.slidePage(this.enterNameView.$el);
        	this.enterNameView.render();
        	this.enterNameView.$el.one('webkitTransitionEnd', function(e) {
	            $('input').first().focus();
	        });
        },

        setinterval : function(){
        	var self = this;
        	this.setIntervalView = new SetIntervalView({model:this.tempModel});
        	this.slider.slidePage(this.setIntervalView.$el);
        	this.setIntervalView.render();
        	this.setIntervalView.$el.one('webkitTransitionEnd', function(e) {
	            self.setIntervalView.initSelector();
	        });
        },

        settimestart : function(){
        	var self = this;
        	this.setTimeView = new SetTimeStartView({model:this.tempModel});
        	this.slider.slidePage(this.setTimeView.$el);
        	this.setTimeView.render();
        	this.setTimeView.$el.one('webkitTransitionEnd', function(e) {
	            self.setTimeView.initSelector();
	        });
        },

        setduration : function(){
        	var self = this;
        	this.setDurationView = new SetDurationView({model:this.tempModel});
        	this.slider.slidePage(this.setDurationView.$el);
        	this.setDurationView.render();
        	this.setDurationView.$el.one('webkitTransitionEnd', function(e) {
	            self.setDurationView.initSelector();
	        });
        },

        timercomplete : function(){
        	var self = this;
        	this.timeCompleteView = new TimerCompleteView({model:this.tempModel});
        	this.slider.slidePage(this.timeCompleteView.$el);
        	this.timeCompleteView.render();
        	this.timeCompleteView.$el.one('webkitTransitionEnd', function(e) {
	            self.timeCompleteView.initSelector();
	        });
        },


    });

    return ApplicationRouter;
});