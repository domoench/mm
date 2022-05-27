"use strict";

// Return an integer between a and b (inclusive)
export const randBetween = (a: number, b: number) => {
  return a + Math.floor(Math.random() * (b - a + 1));
};

// Return the smallest integer with n digits
export const smallestInt = (n: number) => {
  if (n <= 1) {
    return 0;
  }
  return 10 ** (n - 1);
};

// Return the largest integer with n digits
export const largestInt = (n: number) => {
  // TODO handle n < 1
  return 10 ** n - 1;
};

// Convert milliseconds to seconds
export const msToS = (time: number) => {
  return time / 1000.0;
};

// Choose random element from an array
export const randomElem = (arr: any[]) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

export const exitWithError = (errStr: any) => { // TODO typescript Error type?
  console.error(errStr);
  process.exit(1);
};
