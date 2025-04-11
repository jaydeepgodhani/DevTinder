// Module protects their variables and functions from leaking
// Even if you require this module sum will not work without exporting from here

// This are called commonJs module (cjs)
// By default CJS is enabled (you could have provided "type": "commonjs")
// CJS is Synchronous, after loading require only it will load below code
// By default it's non-strict mode

// If you want to use (ES Modules) MJS then in package.json file you have to define "type": "module"
// import and export should be used for MJS (which is recommanded)
// Async loading of pkg is available
// By default it's Strict mode

// If you have multiple math function to export by importing all of it like sum, multiply, divide etc
// you can create a folder `calculate` and create index.js file
// inside index.js import all math function and again export it from there
// In consuming module, require from calculate directly
console.log("xyz...");

var message = 'hello from xyz';

z = "This is valid in CJS module but not in MJS";

function sum (a, b) {
  console.log(a+b);
}

console.log(module.exports); // Empty object, you can attach like module.exports.sum

module.exports = {sum, message};