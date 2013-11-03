'use strict';
function observable(obj) {
	var events = {};

	obj.on = function(name, callback) {
		var names = name.split(" ");
		for (var i in names) {
			events[names[i]] = events[names[i]] || [];
			events[names[i]].push(callback);
		}
	}

	obj.off = function(name) {
		delete events[name];
	}

	obj.trigger = function(name) {
		if (events[name]) {
			var args = Array.prototype.slice.call(arguments,1);
			for (var i in events[name])
				events[name][i].apply(obj, args);	
		}	
	}
}