// dfin.js
// reqr.js

/**
 * dfd - defined Object/Function store
 * @type {Object}
 */
var dfd = {
	len: 0
};

/**
 * dfn - The define function for the amd loader
 * @param  {String|Integer} name - The given id for the definition (will overwrite same name)
 * @param  {String[]|Integer[]} deps - The ids of other definitions to load
 * @param  {Object|Function} def - The definition for this thing
 * @return {Function dfn} Returns itself, to allow for some crazy chaining
 */
var dfn = function (name, deps, def) {
	// Allow for only a definition
	if (typeof name !== "string") {
		def = deps;
		deps = name;
		name = dfd.len++;
	}
  	
  	// Allow for only a name and definition 
	if (typeof def === "undefined") {
		def = deps;
		deps = [];
	}

	// push the dependencies into the args
	var args = [];
	while (deps.length) {
		args.push( dfd[deps.shift()] );
	}
    
	// grab the return from a function, or just the value given
	if (typeof def === "function") {
		dfd[name] = def.apply(this, args);
	} else {
		dfd[name] = def;
	}

	return dfn;
};

/**
 * rqr - The require function for the amd loader
 * @param  {any[]} deps - Array of the dependencies passed in to the required function
 * @param  {Function} def - The definition to be called after all dependencies have loaded
 */
var rqr = function (deps, def) {
	var args = [],
		copy = [].slice.call(deps);

	while (copy.length) {
		args.push( dfd[copy.shift()] );
	}

	def.apply(this, args);
};
