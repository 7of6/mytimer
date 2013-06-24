/*global define*/

define([
    'underscore',
    'backbone',
    'models/timer-model'
], function (_, Backbone, TimerModel) {
    'use strict';

    var TimerCollection = Backbone.Collection.extend({
        model: TimerModel
    });

    return new TimerCollection();
});