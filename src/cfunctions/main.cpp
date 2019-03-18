// #include <iostream>
// #include <string>
// using namespace std;


// int* concat(int* a, int* b, int asize, int bsize) {
//   int bufSize = asize + bsize;
//   int result[bufSize];
//   for(int i=0; i<bufSize; i++) {
//     if(i < asize) {
//       result[i] = a[i];
//     }
//     else {
//       result[i] = b[i - bsize];
//     }
//   }

//   return result;
// }

// int main() 
// {
//   int s1[3] = {1, 2, 3};
//   int s2[3] = {4, 5, 6};
//   int* res;
//   res = concat(s1, s2, 3, 3);
//   for (int i = 0; i < 6; i++) 
//     cout << "val:" << *(res + i) << endl;
//   return 0;
// }

