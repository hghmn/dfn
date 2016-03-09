// dfin.js
// reqr.js

var defd = {
	length: 0
};

var dfin = function (name, deps, def) {
	if (typeof name !== "string") {
		def = deps;
		deps = name;
		name = defd.length++;
	}
  
	if (typeof def === "undefined") {
		def = deps;
		deps = [];
	}

	// push the dependencies into the args
	var args = [];
	while (deps.length) {
		args.push( defd[deps.shift()] );
	}
    
	// grab the return from a function, or just the value given
	if (typeof def === "function") {
		defd[name] = def.apply(this, args);
	} else {
		defd[name] = def;
	}
};

var reqr = function (deps, def) {
	var args = [];
	while (deps.length) {
		args.push( defd[deps.shift()] );
	}

	// def[name] = 
	def.apply(this, args);
};


// fire away

dfin(
	'dep_1',
	function () {
		// define dep_1 here
		return true;
	}
);

dfin(
	// don't give a name, it will take an index from dfin
	function () {
		// define dep_2 here
		return false;
	}
);

// just store a value in dfin
// should take index 1
dfin(
	{
		key: "value",
        another: "for good luck",
        int: 1
	}
);

dfin(
	'thing_1',
	['dep_1', 0],
	function (dep_1, dep_2) {
		// define thing 1 here
		var thing_1 = {
			dep_1: dep_1,
			dep_2: dep_2
		};

		setTimeout(function(){
			thing_1.dep_1 = "changed!";
		},1000);

		return thing_1;
	}
);

dfin(
	'thing_2',
	function () {
		// define thing 2 here
		var thing_2 = "string";

		return thing_2;
	}
);

reqr(['thing_1', 'thing_2', 1],
	function (thing_1, thing_2, obj) {
		// do something with thing 1 and thing 2 here
		thing_1.newKey = thing_2;
		
		window.thing = thing_1;

		console.log(thing_1);
        console.log(obj);
	}
);
