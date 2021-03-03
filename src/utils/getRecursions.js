export function recursionN(n, k, sum = 1) {
  if (k === 0) return sum;
  else {

    sum *= n;
    return recursionN(n - 1, k - 1, sum);
  }
}

export function recursionK(k, sum = 1) {
  if (k === 0) return sum;
  else {
    sum *= k;
    return recursionK(k - 1, sum);
  }
}