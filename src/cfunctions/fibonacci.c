int cfibonacci(int n) {
  if (n == 1) return 1;
  if (n == 2) return 1;
  return cfibonacci(n-1) + cfibonacci(n-2);
}