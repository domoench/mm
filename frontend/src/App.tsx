import React from "react";
import "./App.css";
import Quiz from "./Quiz";
import Stats from "./Stats";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Quiz></Quiz>
        <Stats></Stats>
      </header>
    </div>
  );
}

export default App;
