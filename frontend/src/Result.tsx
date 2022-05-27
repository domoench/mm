import React from "react";

export interface ResultProps {
  isCorrect: boolean;
  userAnswer: number;
  answer: number;
}

export const Result = (props: ResultProps) => {
  return (
    <div>
      <p>{props.isCorrect? 'CORRECT' : 'WRONG'}</p>
      <p>Answer: {props.answer}</p>
    </div>
  );
};
