'use strict';
function observable(obj) {
	var events = {};
	var serial = 0;

	obj.on = function(name, callback) {
		var names = name.split(" ");
		for (var i in names) {
			var split = resolveName(names[i])
			var key = split.subname + '_' + serial++;
			events[split.name] = events[split.name] || {};
			events[split.name][key] = callback;
		}
	}

	obj.off = function(name) {
		if (name.indexOf('.') == -1)
			delete events[name];
		else {
			var split = resolveName(name)
			var reg = new RegExp(split.subname +'_\\d+');
			var delAll = true;
			for (var i in events[split.name]) {
				if (reg.test(i))
					delete events[split.name][i];
				else 
					delAll = false;
			}
			if (delAll) delete events[split.name];
		}
	}

	obj.trigger = function(name) {
		if (events[name] != undefined) {
			var args = Array.prototype.slice.call(arguments,1);
			for (var i in events[name])
				events[name][i].apply(obj, args);	
		}	
	}

	function resolveName(name) {
		var index = name.indexOf('.');
		if (index == -1)
			return {name: name, subname: ''};
		else
			return {name: name.substr(0, index), subname: name.substr(index + 1)};
	}
}