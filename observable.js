'use strict';
function observable(obj) {
	var events = {};

	obj.on = function(name, callback) {
		var names = name.split(" ");
		for (var i in names) {
			var split = resolveName(names[i])
			events[split.name] = events[split.name] || [];
			events[split.name].push({namespace: split.namespace, callback: callback});
		}
	}

	obj.off = function(name) {
		if (name.indexOf('.') == -1)
			delete events[name];
		else {
			var split = resolveName(name)
			for (var i in events[split.name])
				 if (events[split.name][i].namespace == split.namespace)
					delete events[split.name][i];
			if (events[split.name].length == 0) 
				delete events[split.name];
		}
	}

	obj.trigger = function(name) {
		var split = resolveName(name);
		if (events[split.name] != undefined) {
			var args = Array.prototype.slice.call(arguments,1);
			for (var i in events[split.name])
				if (split.namespace == '' || events[split.name][i].namespace == split.namespace)
					events[split.name][i].callback.apply(obj, args);	
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