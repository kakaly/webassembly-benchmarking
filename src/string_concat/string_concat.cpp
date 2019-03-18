#include "emscripten.h"

extern "C" {
  int* EMSCRIPTEN_KEEPALIVE concat(int* a, int* b, int asize, int bsize) {
    int bufSize = asize + bsize;
    int result[bufSize];
    for(int i=0; i<bufSize; i++) {
      if(i < asize) {
        result[i] = a[i];
      }
      else {
        result[i] = b[i - bsize - 1];
      }
    }
    auto arrayPtr = &result[0];
    return arrayPtr;
  }
}