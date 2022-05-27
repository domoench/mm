"use strict";
import { randBetween, smallestInt, largestInt } from "./utils";
import { ADD, SUBTRACT, MULTIPLY, DIVIDE } from "../config";

interface OpTupleReturn {
  operator: string;
  op_1: number;
  op_2: number;
  answer: number;
};

/**
 * Returns a tuple (operator, operand_1, operand_2, answer) for an
 * addition problem.
 *
 * @param {string} operator - The binary operator. e.g. '+', '-', '*', '/'
 * @param {number} n - An integer number of digits for the first operand
 * @param {number} m - An integer number of digits for the second operand
 */
export const OpTuple = (operator: string, n: number, m: number): OpTupleReturn => {
  const op_1 = randBetween(smallestInt(n), largestInt(n));
  const op_2 = randBetween(smallestInt(m), largestInt(m));
  let answer = NaN;
  switch (operator) {
    case ADD:
      answer = op_1 + op_2;
      break;
    case SUBTRACT:
      answer = op_1 - op_2;
      break;
    case MULTIPLY:
      answer = op_1 * op_2;
      break;
    case DIVIDE:
      answer = op_1 / op_2;
      break;
  }
  return {
    operator,
    op_1,
    op_2,
    answer,
  };
};
