export enum Operator {
  Add = "+",
  Subtract = "-",
  Multiply = "*",
  Divide = "/",
}

export const difficultyRange = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// TODO
// - SQUARE (i.e. multiplication by same operand. p44)
// - Day of week

// For each problem type, map a difficulty rating [1,10] to a list of n,m tuple
// where n and m are the number of digits for the first and second operand
export const DIFFICULTIES = {
  [Operator.Add]: {
    "1": [[1, 1]],
    "2": [[2, 1]],
    "3": [[2, 2]],
    "4": [[3, 2]],
    "5": [[3, 3]],
    "6": [
      [4, 2],
      [4, 3],
    ],
    "7": [[4, 4]],
    "8": [[4, 4]],
    "9": [[4, 4]],
    "10": [[4, 4]],
  },
  [Operator.Subtract]: {
    "1": [[1, 1]],
    "2": [[2, 1]],
    "3": [[2, 2]],
    "4": [[3, 2]],
    "5": [[3, 3]],
    "6": [
      [4, 2],
      [4, 3],
    ],
    "7": [
      [4, 4],
      [3, 4],
    ],
    "8": [[4, 4]],
    "9": [[4, 4]],
    "10": [[4, 4]],
  },
  [Operator.Multiply]: {
    "1": [[1, 1]],
    "2": [[2, 1]],
    "3": [[2, 1]],
    "4": [[3, 1]],
    "5": [
      [3, 1],
      [1, 3],
    ],
    "6": [[2, 2]],
    "7": [[2, 2]],
    "8": [[2, 2]],
    "9": [[2, 2]],
    "10": [
      [3, 2],
      [2, 3],
    ],
  },
  [Operator.Divide]: {
    "1": [[2, 1]],
    "2": [[3, 1]],
    "3": [[4, 1]],
    "4": [[3, 2]],
    "5": [[4, 2]],
    "6": [[3, 1]],
    "7": [[3, 1]],
    "8": [[3, 1]],
    "9": [[3, 1]],
    "10": [[3, 1]],
  },
};
