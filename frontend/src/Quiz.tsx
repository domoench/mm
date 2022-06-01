import React, {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  FormEvent,
} from "react";
import { OpTuple } from "./lib/mm";
import { randomElem } from "./lib/utils";
import { Result, ResultProps } from "./Result";
import { Operator } from "./config";

interface QuizSettingsState {
  difficulty: number;
  operators: Operator[];
  m: number;
  n: number;
}

const Quiz = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [quizSettings, setQuizSettings] = useState<QuizSettingsState>({
    difficulty: 3,
    operators: [Operator.Add, Operator.Subtract, Operator.Multiply, Operator.Divide],
    m: 2,
    n: 2,
  });
  const toggleAdd = () => {
    toggleOperator(Operator.Add);
  };
  const toggleSubtract = () => {
    toggleOperator(Operator.Subtract);
  };
  const toggleMultiply = () => {
    toggleOperator(Operator.Multiply);
  };
  const toggleDivide = () => {
    toggleOperator(Operator.Divide);
  };
  const opIsActive = (op: Operator) => {
    const { operators } = quizSettings;
    return operators.findIndex((x) => x === op) >= 0;
  }
  const toggleOperator = (op: Operator) => {
    const newOperators = opIsActive(op)
      ? quizSettings.operators.filter((x) => x !== op)
      : quizSettings.operators.concat(op);
    setQuizSettings({
      ...quizSettings,
      operators: newOperators,
    });
  };

  randomElem(quizSettings.operators);
  const [opTuple, setOpTuple] = useState(
    OpTuple(randomElem(quizSettings.operators), quizSettings.m, quizSettings.n)
  );
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
    const randomOp = randomElem(quizSettings.operators);
    setOpTuple(OpTuple(randomOp, quizSettings.m, quizSettings.n)); // TODO configurable difficulty
    setUserAnswer("");
    setLastResult({
      isCorrect,
      userAnswer: userAnswerFloat,
      answer,
      opTuple,
    });
  };

  // TODO? Pull out separate settings and question component
  return (
    <>
      <ul>
        <li>
          <button type="button" onClick={toggleAdd} className={`${opIsActive(Operator.Add) ? "active" : ""}`}>
            +
          </button>
        </li>
        <li>
          <button type="button" onClick={toggleSubtract} className={`${opIsActive(Operator.Subtract) ? "active" : ""}`}>
            -
          </button>
        </li>
        <li>
          <button type="button" onClick={toggleMultiply} className={`${opIsActive(Operator.Multiply) ? "active" : ""}`}>
            *
          </button>
        </li>
        <li>
          <button type="button" onClick={toggleDivide} className={`${opIsActive(Operator.Divide) ? "active" : ""}`}>
            /
          </button>
        </li>
      </ul>
      <form onSubmit={submitHandler}>
        {op_1} {operator} {op_2} ={" "}
        <input
          type="text"
          ref={inputRef}
          value={userAnswer}
          onChange={handleUserAnswerChange}
        />{" "}
        <button type="submit">Submit</button>
      </form>
      {lastResult && <Result {...lastResult} />}
    </>
  );
};

export default Quiz;
