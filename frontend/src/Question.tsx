import React from "react";
import { OpTuple } from "./lib/mm";

const Question = () => {
  const { operator, op_1, op_2, answer } = OpTuple('+', 3, 2);
  return (
    <div>
      <p>{op_1} {operator} {op_2} = { answer } </p>
    </div>
  );
}

export default Question;
