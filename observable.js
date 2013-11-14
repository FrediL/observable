(function(win) { 'use strict';
	win['observable'] = function(obj) {
		var events = {};

		obj.on = function(names, callback) {
			var names = names.split(/\s+/);
			for (var i in names) {
				var event = resolveName(names[i]);
				events[event.name] = events[event.name] || [];
				events[event.name].push({namespace: event.namespace, callback: callback});
			}
		}

		obj.off = function(name) {
			var event = resolveName(name);
			if (event.namespace == '')
				delete events[name];
			else {
				for (var i in events[event.name])
					 if (events[event.name][i].namespace == event.namespace)
						delete events[event.name][i];
				if (!events[event.name].length)
					delete events[event.name];
			}
		}

		obj.trigger = function(name) {
			var event = resolveName(name);
			if (events[event.name]) {
				var args = Array.prototype.slice.call(arguments,1);
				for (var i in events[event.name])
					if (event.namespace == '' || events[event.name][i].namespace == event.namespace)
						events[event.name][i].callback.apply(obj, args);
			}
		}

		function resolveName(name) {
			var index = name.indexOf('.');
			if (index == -1)
				return {name: name, namespace: ''};
			else
				return {name: name.substr(0, index), namespace: name.substr(index + 1)};
        }
    }
})(window);