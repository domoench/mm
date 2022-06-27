"use strict";
// Functionality related to the top level mental math logic // TODO no longer true

import * as console from "console";
import { getAggregateStats, getGranularStats } from "../lib/db.js";
import { msToS } from "../lib/utils.js";

export const printGranularStats = async () => {
  let stats = await getGranularStats();
  stats = stats.map((stat) => {
    return {
      ...stat,
      total_time: msToS(stat.total_time),
      avg_time: msToS(stat.avg_time),
      correct_ratio: stat.correct_ratio.toFixed(2),
    };
  });
  console.log("Granular Stats:");
  console.table(stats);
};

export const printAggregateStats = async () => {
  let stats = await getAggregateStats();
  stats = stats.map((stat) => {
    return {
      ...stat,
      total_time: msToS(stat.total_time),
      avg_time: msToS(stat.avg_time),
      correct_ratio: stat.correct_ratio.toFixed(2),
    };
  });
  console.log("Aggregate Stats:");
  console.table(stats);
};
