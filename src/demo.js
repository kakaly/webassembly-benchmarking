import compileWasm from "./lib.js"
import { jsfibonacci } from "./jsfunctions.js"

var wasmModule = compileWasm('wasm/fibonacci.wasm')
wasmModule.then(instance => {
  var t0 = performance.now();
  for (var i = 0; i < 100; i++) {
    var result = instance.exports._cfibonacci(20)
    //var result = jsfibonacci(20)
  }
  var t1 = performance.now();
  console.log(result)
  console.log("Function took " + ((t1 - t0)/100).toFixed(4) + " milliseconds.")
})