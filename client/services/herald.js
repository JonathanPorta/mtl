//
(function(){
	angular.module('mtl').factory('herald', function(){
		var herald = function(){
			var self = this;
		};

		herald.prototype.listeners = {};

		herald.prototype.trigger = function(event, data){
			if(this.listeners.hasOwnProperty(event))
			{
				for(i in this.listeners[event])
				{
					this.listeners[event][i](data);
				}
			}
			else
			{
				console.warn("No listeners for " + event + "event. Please hangup and try your call again. 406-D-1 Billings, Main.");
			}
		};

		herald.prototype.listen = function(event, func){
			if(!this.listeners.hasOwnProperty(event))
			{
				this.listeners[event] = [];
			}
			this.listeners[event].push(func);
			console.log("Registered for " + event + " event: ", func);
		};

		return new herald();
	});
}).call(this);
