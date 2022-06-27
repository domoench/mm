import React, {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  FormEvent,
} from "react";
import { randomOpTuple } from "./lib/mm";
import { Result, ResultProps } from "./Result";
import { Operator, difficultyRange } from "./config";

interface QuizSettingsState {
  difficulty: number;
  operators: Operator[];
}

const Quiz = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [quizSettings, setQuizSettings] = useState<QuizSettingsState>({
    difficulty: 3,
    operators: [
      Operator.Add,
      Operator.Subtract,
      Operator.Multiply,
      Operator.Divide,
    ],
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
  };
  const toggleOperator = (op: Operator) => {
    const newOperators = opIsActive(op)
      ? quizSettings.operators.filter((x) => x !== op)
      : quizSettings.operators.concat(op);
    setQuizSettings({
      ...quizSettings,
      operators: newOperators,
    });
  };
  const setDifficulty = (level: number) => {
    setQuizSettings({
      ...quizSettings,
      difficulty: level,
    });
  };
  const handleDifficultyChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setDifficulty(parseInt(event.target.value));
  };

  // TODO consider packagins some of this state up in a questionState object
  // startTime, opTuple, perhaps even userAnswer?
  // questionState exists until user hits submit, then it is overwritten by the next question
  const [opTuple, setOpTuple] = useState(
    randomOpTuple(quizSettings.operators, quizSettings.difficulty)
  );
  const { operator, op_1, op_2, answer } = opTuple;

  const [userAnswer, setUserAnswer] = useState("");
  const handleUserAnswerChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUserAnswer(event.target.value);
  };

  const [startTime, setStartTime] = useState<Date>(new Date());

  const [lastResult, setLastResult] = useState<ResultProps | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  });

  // TODO move this elsewhere
  interface Stats {
    type: Operator;
    sub_type: string | null;
    correct: boolean;
    difficulty: number;
    start_time: string;
    duration: number;
  }

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const submitTime = new Date();

    const userAnswerFloat = parseFloat(userAnswer); // TODO handle parse error
    const isCorrect = userAnswerFloat === answer;

    // Submit stats to backend
    const stats: Stats = {
      type: operator,
      sub_type: null,
      correct: isCorrect,
      difficulty: quizSettings.difficulty,
      start_time: startTime.toISOString(), // TODO is this UTC? Where to define start time?
      duration: submitTime.valueOf() - startTime.valueOf(),
    };

    // TODO configure URL
    fetch("http://localhost:3000/stats", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(stats),
    });
    // TODO: No need to await this, but would be good to async log whether or not it succeeded. Could eventually
    // build functionality to try again on failure.

    // Generate a new question to rerender
    setOpTuple(randomOpTuple(quizSettings.operators, quizSettings.difficulty));
    setUserAnswer("");
    setStartTime(new Date());
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
          <button
            type="button"
            onClick={toggleAdd}
            className={`${opIsActive(Operator.Add) ? "active" : ""}`}
          >
            +
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={toggleSubtract}
            className={`${opIsActive(Operator.Subtract) ? "active" : ""}`}
          >
            -
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={toggleMultiply}
            className={`${opIsActive(Operator.Multiply) ? "active" : ""}`}
          >
            *
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={toggleDivide}
            className={`${opIsActive(Operator.Divide) ? "active" : ""}`}
          >
            /
          </button>
        </li>
        <li>
          <form>
            <select
              value={quizSettings.difficulty}
              onChange={handleDifficultyChange}
            >
              {difficultyRange.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </form>
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
