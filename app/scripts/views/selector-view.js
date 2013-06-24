/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'hammer',
], function ($, _, Backbone, JST, Hammer) {
    'use strict';

    var SelectorView = Backbone.View.extend({
        template: JST['app/scripts/templates/selector.ejs'],
        render: function(container, display, colour, maximumValue, readout){

            this.colour = colour;
            this.maximumValue = maximumValue;
            this.readout = readout;
            this.display = display;

        	this.$el.html(this.template);

            container.append(this.$el);
        
            var self = this;

            var canvas = this.$el.find("#selector-canvas")[0];
            var ctx = canvas.getContext("2d");

            this.canvasOffset = this.$el.find("#selector-canvas").offset();
           
            var circleArc = Math.PI * 2;

            var hammertime = this.$el.find("#selector-canvas").hammer();

            var centerX = 214;
            var centerY = 214;
            var radius = 191;
            var capRadius = 20;

            Draw(canvas.width / 2, 0);

            function Draw(mouseX, mouseY) {

                // given mousePosition, what is the nearest point on the knob
                var rads = Math.atan2(mouseY - centerY, mouseX - centerX);
                var capX = radius * Math.cos(rads) + centerX;
                var capY = radius * Math.sin(rads) + centerY;

                // start drawing
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                // draw tailend
                ctx.beginPath();
                ctx.arc(canvas.width / 2, 23, capRadius, 0, circleArc, false);
                ctx.fillStyle = self.colour;
                ctx.fill();

                // draw knob
                ctx.beginPath();
                ctx.arc(centerX, centerY, radius, 0-(Math.PI / 2), rads, false);       
                ctx.lineWidth = 40;
                ctx.strokeStyle = self.colour;
                ctx.stroke();

                // draw indicator
                ctx.beginPath();
                ctx.arc(capX, capY, capRadius-6, 0, circleArc, false);
                ctx.fillStyle = "#ffffff";
                ctx.fill();
                ctx.lineWidth = 12;
                ctx.strokeStyle = self.colour;
                ctx.stroke();

                var perc = calcPerc(rads);

                self.displayVal = Math.round(self.maximumValue * perc);

                console.log(self.displayVal);

                self.display.html(self.displayVal + " " + self.readout);

            }

            function calcPerc(rads){

                var deg = ((Math.PI / 2) + rads) / (Math.PI / 180);
                if (deg < 0){
                  deg = 360 + deg;
                }
                var perc = (deg / 360);

                return perc;

            }

            function handleInteraction(ev){

                ev.gesture.preventDefault();
                var MouseX = parseInt(ev.gesture.center.pageX - self.canvasOffset.left);
                var MouseY = parseInt(ev.gesture.center.pageY - self.canvasOffset.top);
                Draw(MouseX, MouseY);

            }

            hammertime.on("drag", function(ev){
                handleInteraction(ev);
            });

            hammertime.on("tap", function(ev){
                handleInteraction(ev);
            });

        },
        getValue : function(){

            return this.displayVal;

        },
        updateOffset : function(){
            this.canvasOffset = this.$el.find("#selector-canvas").offset();
        }
       
    });

    return SelectorView;
});