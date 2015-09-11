/**
 * ultra lightweight implementation of an AMD loader
 * supports defining dependencies, and loading a function with the defined dependencies
 */
var waiting = {};
var defined = {};

function require (deps, callback) {

  // these vars are available to the functions wrapped in closures
  var pending = Array.prototype.slice.call(arguments[0]); // convert arguments passed in to array
  var pending_length = pending.length; //cache length of the arguments array
  var results_length = 0;

  // call pass from every async function, increment until all dependencies have passed
  var pass = function (name, definition) {
    results_length ++;

    // save this if it's not yet saved
    if( "undefined" === typeof defined[name] ) {
      defined[name] = definition;
      delete waiting[name];
    }

    // if all async functions have finished, pass the results to _then(),
    // which has been redefined to the user's completion function
    if (++results_length === pending_length) {
      var definedArgs=[];

      while(pending[0]) {
        definedArgs.push( defined[ pending.shift() ] );
      }

      // make the callback with the found args
      callback.apply(null, definedArgs);
    }
  };

  // call fail from an async function to cancel the dependency loading with an optional message
  var fail = function (err) {
    console.error('ERROR: ' + err);
    return false;
  };

  // walk through every dependency
  pending.forEach(function(dep){
    if ("undefined" !== typeof defined[dep]) {
      pass(dep, defined[dep]);
    } else {
      waiting[dep].call(require, pass, fail);
    }
  });
}

// ==================================================
// 
// ==================================================

// WARN: this allows for a definition to be overwritten
function define (name, definition) {
  waiting[name] = definition;
  return name; // allow for dependencies to be declared inline for require
}
