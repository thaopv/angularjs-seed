;(function() {
	'use strict';

	angular.module('myapp').factory('/services/event-emitter', [
		'@lodash',
		function(_) {
			var EventEmitter = function() {
				this.handlers = {};
			};

			var proto = EventEmitter.prototype;

			proto.createDehandler = function(event, handler) {
				return function() {
					var handlers = this.handlers[event];

					if (_.isArray(handlers)) {
						_.pull(handlers, handler);

						if (handlers.length === 0) {
							this.handlers[event] = undefined;
						}
					}

					event = undefined;
					handlers = undefined;
					handler = undefined;
				}.bind(this);
			};

			proto.on = function(event, handler) {
				if (!event || !_.isFunction(handler)) {
					return this.createDehandler();
				}

				this.handlers[event] = this.handlers[event] || [];

				this.handlers[event].push(handler);

				return this.createDehandler(event, handler);
			};

			proto.emit = function(event, data) {
				var handlers = this.handlers[event];

				_.forEach(handlers, function(handler) {
					handler.call(this, data);
				}, this);

				return !!handlers;
			};

			proto.destroy = function() {
				// remove callback
				_.forEach(this.handlers, function(value) {
					value.length = 0;
				});

				this.handlers = undefined;
			};

			return EventEmitter;
		},
	]);
})();
