var Module = require("./module.js")
const {
  performance
} = require('perf_hooks');

Module['onRuntimeInitialized'] = onRuntimeInitialized;
function onRuntimeInitialized() {
  // init inputs
  var a = "hello "
  var b = "world"

  //convert to ascii array
  a_ascii = [];
  for (var i = 0; i < a.length; i ++)
    a_ascii.push(a[i].charCodeAt(0));
  b_ascii = [];
  for (var i = 0; i < b.length; i ++)
    b_ascii.push(b[i].charCodeAt(0));

  //allocate Float32Array and fill with ascii data
  const a_typedArray = new Float32Array(a_ascii.length)
  for (let i=0; i<a_ascii.length; i++) {
    a_typedArray[i] = a_ascii[i]
  }
  const b_typedArray = new Float32Array(b_ascii.length)
  for (let i=0; i<b_ascii.length; i++) {
    b_typedArray[i] = b_ascii[i]
  }

  /* --Make WASM call to concatenate the strings-- */

  //allocate memory on wasm heap
  a_buffer = Module._malloc(a_typedArray.length * a_typedArray.BYTES_PER_ELEMENT)
  Module.HEAPF32.set(a_typedArray, a_buffer >> 2)

  b_buffer = Module._malloc(b_typedArray.length * b_typedArray.BYTES_PER_ELEMENT)
  Module.HEAPF32.set(b_typedArray, b_buffer >> 2)

  //call wasm func
  var t0 = performance.now();
  var result = Module._concat(a_buffer, b_buffer, a.length, b.length)
  var t1 = performance.now();

  /* ----- */

  // fill the result to a js array
  const arrayData = []
  for (let pointer=0; pointer<11; pointer++) {
    arrayData.push(Module.HEAPF32[result/Float32Array.BYTES_PER_ELEMENT+pointer])
  }
  //convert ascii array to string and display the result
  var res_string = String.fromCharCode.apply(null, arrayData)
  console.log(`Input: a: "${a}", b: "${b}"`)
  console.log(`Result on concat: "${res_string}"`)
  console.log("Call to concat using wasm took " + (t1 - t0) + " milliseconds.")
}

// var a = "hello "
// var b = "world"
// var t0 = performance.now();
// a.concat(b)
// var t1 = performance.now();
// console.log("Call to concat using js took " + (t1 - t0) + " milliseconds.")