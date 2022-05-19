"use strict";

// Return an integer between a and b (inclusive)
export const randBetween = (a, b) => {
  return a + Math.floor(Math.random() * (b - a + 1));
};

// Return the smallest integer with n digits
export const smallestInt = (n) => {
  if (n <= 1) {
    return 0;
  }
  return 10 ** (n - 1);
};

// Return the largest integer with n digits
export const largestInt = (n) => {
  // TODO handle n < 1
  return 10 ** n - 1;
};

// Choose random element from an array
export const randomElem = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

export const exitWithError = (errStr) => {
  console.error(errStr);
  process.exit(1);
};
