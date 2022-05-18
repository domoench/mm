'use strict';
import { writeStat } from '../lib/db.js';

// Functionality related to the top level mental math logic

import * as readline from 'node:readline/promises';
import { randBetween, smallestInt, largestInt } from '../lib/utils.js';

const ADD = '+';
const SUBTRACT = '-';
const MULTIPLY = '*';
const DIVIDE = '/';

const operations = [ADD, SUBTRACT, MULTIPLY, DIVIDE];

/**
 * Returns a tuple (operator, operand_1, operand_2, answer) for an
 * addition problem.
 *
 * @param {string} operator - The binary operator. e.g. '+', '-', '*', '/'
 * @param {number} n - An integer number of digits for the first operand
 * @param {number} m - An integer number of digits for the second operand
 */
const op_tuple = (operator, n, m) => {
  const op_1 = randBetween(smallestInt(n), largestInt(n));
  const op_2 = randBetween(smallestInt(m), largestInt(m));
  let answer;
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

// Prompt the user to answer the given problem.
const quiz = async (prob) => {
  let start = new Date();
  const { operator, op_1: a, op_2: b, answer } = prob;
  const q = `${a} ${operator} ${b} = ???\n`;
  const user_answer = parseFloat(await rl.question(q));
  let end = new Date();
  // TODO Set a 'reasonable' cap on end time? 2 minutes then problem marked wrong?
  const is_correct = user_answer === answer;
  if (is_correct) {
    console.log('CORRECT');
  } else {
    console.log(`WRONG. Correct answer is: ${answer}`);
  }

  const stats = {
    type: operator,
    sub_type: null,
    correct: is_correct,
    difficulty: 1, // TODO
    start_time: start,// TODO is this UTC?
    end_time: end,
  };
  await writeStat(stats);
  // TODO batch this? don't need to write to DB on every single problem

  return is_correct; // TODO return full stats
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '> ',
});

const graceful_exit = (summary) => {
  const { correct, num_probs } = summary;
  console.log(
    `THE END. ${correct}/${num_probs} correct. ${((correct / num_probs) * 100).toFixed(1)}%`
  );
  process.exit(0);
};

// Start up the main repl
export const repl = async () => {
  let num_probs = 1;
  let correct = 0;

  rl.on('SIGINT', () => graceful_exit({ num_probs, correct }));

  // Start the loop
  for (;;) {
    const op = operations[Math.floor(Math.random() * operations.length)];
    // TODO timer
    // TODO choose n and m based on difficulty
    const prob = op_tuple(op, 2, 2);
    const is_correct = await quiz(prob);

    if (is_correct) {
      correct += 1;
    }
    num_probs += 1;
  }
};
