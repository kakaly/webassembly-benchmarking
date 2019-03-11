export function jsfibonacci(n) {
  if (n == 1) return 1
  if (n == 2) return 1
  return jsfibonacci(n-1) + jsfibonacci(n-2)
}