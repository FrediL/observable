
function Engine() {
	observable(this);

	this.status = "stop";

	this.on('start',function() {
		this.status = "start";
	});

	this.on('stop',function() {
		this.status = "stop";
	});
}


var obj = new Engine();

test("Trigger", function() {
	obj.trigger('start');
	equal( obj.status, 'start');
	obj.trigger('stop');
	equal( obj.status, 'stop');
});


test("Off", function() {
	obj.status = "stop";
	obj.off('start');
	obj.trigger('start');
	equal( obj.status, 'stop');
});



test("Order",function() {
	var obj = new Object();
	obj.text = "";
	observable(obj);
	obj.on('add',function() {
		obj.text += '0';
	});
	obj.on('add',function() {
		obj.text += '1';
	});
	obj.on('add',function() {
		obj.text += '2';
	});
	obj.trigger('add');
	equal(obj.text,'012');
});