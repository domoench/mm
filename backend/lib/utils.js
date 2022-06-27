"use strict";

// Convert milliseconds to seconds
export const msToS = (time) => {
  return time / 1000.0;
};

export const exitWithError = (errStr) => {
  console.error(errStr);
  process.exit(1);
};
