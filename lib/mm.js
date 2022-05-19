'use strict';
// Functionality related to the top level mental math logic

import * as console from 'console';
import * as readline from 'node:readline/promises';
import { writeStat, getAggregateStats, getGranularStats } from '../lib/db.js';
import { ADD, SUBTRACT, MULTIPLY, DIVIDE, operations, DIFFICULTIES } from '../config.js';
import { randBetween, smallestInt, largestInt, randomElem, exitWithError } from '../lib/utils.js';

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
const quiz = async (prob, difficulty) => {
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
    difficulty,
    start_time: start.toISOString(),// TODO is this UTC?
    duration: end - start,
  };
  await writeStat(stats); // TODO batch this? try/catch

  return is_correct; // TODO return full stats
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '> ',
});

const printStats = async (stats) => {
  console.table(stats);
  // TODO try ascii charts
};

const gracefulExit = async (summary) => {
  const { correct, num_probs } = summary;
  console.log(
    `THE END. ${correct}/${num_probs} correct. ${((correct / num_probs) * 100).toFixed(1)}%`
  );
  const granStats = await getGranularStats();
  const aggStats = await getAggregateStats();
  console.log('Granular Stats:');
  printStats(granStats);
  console.log('Aggregate Stats:');
  printStats(aggStats);
  process.exit(0);
};

// Start up the main repl
export const repl = async () => {
  let num_probs = 1;
  let correct = 0;

  rl.on('SIGINT', () => gracefulExit({ num_probs, correct }));

  const difficulty = parseInt(await rl.question('Enter difficulty level between 1 (easy) and 10 (hard):\n'));
  if (difficulty <= 1 || difficulty >= 10) exitWithError(`Invalid difficulty: ${difficulty}`);

  let user_ops = await rl.question('What types of operations [+, -, *, /]? (Enter comma separated list)\n');
  // TODO validate only legal operations were entered (with Sets?)
  user_ops = user_ops.split(',');

  // Start the loop
  for (;;) {
    const op = randomElem(user_ops);
    const nAndMs = DIFFICULTIES[op][difficulty];
    const [n, m] = randomElem(nAndMs);
    const prob = op_tuple(op, n, m);
    const is_correct = await quiz(prob, difficulty);

    if (is_correct) {
      correct += 1;
    }
    num_probs += 1;
  }
};
