import { randBetween, randomElem, smallestInt, largestInt } from "./utils";
import { Operator, DIFFICULTIES } from "../config";

export interface OpTupleReturn {
  operator: Operator;
  op_1: number;
  op_2: number;
  answer: number;
}

/**
 * Returns a tuple (operator, operand_1, operand_2, answer) for a
 * binary arithmetic problem.
 *
 * @param {string} operator - The binary operator. e.g. '+', '-', '*', '/'
 * @param {number} n - An integer number of digits for the first operand
 * @param {number} m - An integer number of digits for the second operand
 */
export const OpTuple = (
  operator: Operator,
  n: number,
  m: number
): OpTupleReturn => {
  const op_1 = randBetween(smallestInt(n), largestInt(n));
  const op_2 = randBetween(smallestInt(m), largestInt(m));
  let answer = NaN;
  switch (operator) {
    case Operator.Add:
      answer = op_1 + op_2;
      break;
    case Operator.Subtract:
      answer = op_1 - op_2;
      break;
    case Operator.Multiply:
      answer = op_1 * op_2;
      break;
    case Operator.Divide:
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

// Get the number of digits for each of the two operands (n and m) based on difficulty.
export const getNAndM = (op: Operator, difficulty: number) => {
  const diff = `${difficulty}`;
  const nAndMs: number[][] = (DIFFICULTIES[op] as any)[diff];
  return randomElem(nAndMs);
};

export const randomOpTuple = (operatorOptions: Operator[], difficulty: number) => {
  const randomOp = randomElem(operatorOptions);
  const [n, m] = getNAndM(randomOp, difficulty);
  return OpTuple(randomOp, n, m);
};
