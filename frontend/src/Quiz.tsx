import React, {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  FormEvent,
} from "react";
import { OpTuple } from "./lib/mm";
import { Result, ResultProps } from "./Result";

const Quiz = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [opTuple, setOpTuple] = useState(OpTuple("+", 3, 2));
  const { operator, op_1, op_2, answer } = opTuple;

  const [userAnswer, setUserAnswer] = useState("");
  const handleUserAnswerChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUserAnswer(event.target.value);
  };

  const [lastResult, setLastResult] = useState<ResultProps | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  });

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userAnswerFloat = parseFloat(userAnswer); // TODO handle parse error
    const isCorrect = userAnswerFloat === answer;

    // TODO submit stats to backend

    // Generate a new question to rerender
    setOpTuple(OpTuple("+", 3, 2)); // TODO configurable operator and difficulty
    setUserAnswer("");
    setLastResult({
      isCorrect,
      userAnswer: userAnswerFloat,
      answer,
    });
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        {op_1} {operator} {op_2} = {' '}
        <input
          type="text"
          ref={inputRef}
          value={userAnswer}
          onChange={handleUserAnswerChange}
        />
        {' '}
        <button type="submit">Submit</button>
      </form>
      {lastResult && <Result {...lastResult} />}
    </div>
  );
};

export default Quiz;
