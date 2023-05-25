import { promise } from './promise';

let result = 0;

export function get() {
  return result;
}

export function reset() {
  result = 0;
}

export function main() {
  promise().then((res) => (result = res));
}
