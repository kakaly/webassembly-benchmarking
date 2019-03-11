var importObject = {
  'env': {
    '__memory_base': 0,
    '__table_base': 0,
    'memory': new WebAssembly.Memory({initial: 256}),
    'table': new WebAssembly.Table({initial: 0, element: 'anyfunc'}),
  } 
};


function compileWasm(wasmFile) {
  var wasmModule = fetch(wasmFile).then(response => 
    response.arrayBuffer()
  ).then(bytes =>
    WebAssembly.instantiate(bytes, importObject)
  ).then(results => {
    return results.instance;
  }).catch(e => console.log(e))
  return wasmModule
}

export default compileWasm

// var wasmModule = compileWasm('fib.wasm')
// wasmModule.then(results =>
//   console.log(results.exports._add(10, 11))
// )