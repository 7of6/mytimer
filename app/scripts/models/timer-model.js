/*global define*/

define([
    'underscore',
    'backbone',
], function (_, Backbone) {
    'use strict';

    var TimerModel = Backbone.Model.extend({
        defaults: {
        	title: '',
        	interval: 0,
        	starttime: 0,
        	duration: 0
        }
    });

    return TimerModel;
});