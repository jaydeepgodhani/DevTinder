// all the code of the module is wrapped inside a function (IIFE)
// Immediately Invoked Function Expression -> that's why imported fn can't access variable and fns

// (function (module, require) {
//   ...
// })();
function a() {
  console.log("aa...");
}

a();
console.log("11...");


// NodeJs caches the module which we `require`, so code inside exported code only run once even you require that multiple times
const {sum, message} = require('./xyz');

// There can be require('node:util') which gets the default modules from node

var a = 20;
var b = 30;

sum(a, b);

console.log('msg... ', message);
console.log('global... ', global); // In Browser `window` is global object
console.log('this... ', this); // In browser `this`, `self`, `frames` points to window object itself
console.log('equal... ', globalThis === global); // Global object anywhere. browser, node, deno etc

// For all things to run NodeJS depends upon V8 engine. V8 can't handle async operation
// For any async call Node handoff the task to V8 -> libUV which internally manages all async request via thread pool and queue
// Threadpool has same number of slots as number of cores in your system



// What are we running when we actually run `node app.js`
// It creates main thread in the node process
// Inside main thread here are the sequential steps
// 1. Init Project
// 2. Top Level Code Execution
// 3. Require Module
// 4. Event Callback Register
// 5. Start Event Loop

// There is thread pool available for us which is used by Event Loop for CPU intensive tasks like compression, crypto, calculation
// Event Loop callback execution sequence
// 1. All Expired Timer callback (setTimeout, setInterval)
// 2. All IO Polling (file system) -> when event loop is idle it waits here
// 3. All setImmediate callbacks
// 4. All Close callbacks
// 5. Any pending task ? then again start from 1
// Now there is one more cycle which is process.nextTick() -> promise callback
// This small cycle runs before every phase of Event Loop (4 steps)
// All above 4 steps and 2 steps from small cycle has its own queue

// Any CPU intensive tasks are offloaded to Thread
// By default 4 thread are available. We can set thread pool size with `process.env.UV_THREADPOOL_SIZE = 10`