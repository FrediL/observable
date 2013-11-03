
function Car() {
	observable(this);

	this.status = "stop";
	this.speed = 0;

	this.on('start',function() {
		this.status = "start";
	});

	this.on('stop',function() {
		this.status = "stop";
	});

	this.on('start.speed', function(speed) {
		this.speed  = speed;
	});

	this.on('stop.speed',function() {
		this.speed = 0;
	});
}


test("Trigger", function() {
	var obj = new Car();
	obj.trigger('start');
	equal( obj.status, 'start');
	obj.trigger('stop');
	equal( obj.status, 'stop');
});


test("Off", function() {
	var obj = new Car();
	obj.off('start');
	obj.trigger('start');
	equal( obj.status, 'stop');
});


test("Namespaces", function() {
	var obj = new Car();
	obj.trigger('start',50);
	equal( obj.status, 'start');
	equal( obj.speed, 50);

	var obj = new Car();
	obj.off('start.speed');
	obj.trigger('start', 50);
	equal( obj.status, 'start');
	equal( obj.speed, 0);

	var obj = new Car();
	obj.off('start');
	obj.trigger('start', 50);
	equal( obj.status, 'stop');
	equal( obj.speed, 0);
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

test("Order Namespaces",function() {
	var obj = new Object();
	obj.text = "";
	observable(obj);
	obj.on('add',function() {
		obj.text += '0';
	});
	obj.on('add.second',function() {
		obj.text += '1';
	});
	obj.on('add',function() {
		obj.text += '2';
	});
	obj.on('add.fourth',function() {
		obj.text += '3';
	});
	obj.on('add',function() {
		obj.text += '4';
	});
	obj.trigger('add');
	equal(obj.text,'01234');
});