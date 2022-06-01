import React from "react";
import { OpTupleReturn } from "./lib/mm";

export interface ResultProps {
  isCorrect: boolean;
  userAnswer: number;
  answer: number;
  opTuple: OpTupleReturn;
}

export const Result = (props: ResultProps) => {
  const { op_1, operator, op_2, answer } = props.opTuple;
  return (
    <div>
      <p>{props.isCorrect? 'CORRECT' : 'WRONG'}</p>
      <p>{op_1} {operator} {op_2} = {answer}</p>
    </div>
  );
};
