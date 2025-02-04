import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Instruction from "./components/Instruction";
import QuizWrapper from "./components/QuizWrapper";
import ResultWrapper from "./components/ResultWrapper";

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" Component={Home} exact />
      <Route path="/play/instructions" Component={Instruction} exact/>
      <Route path="/start/quiz" Component={QuizWrapper} exact/>
      <Route path="/play/quiz/result" Component={ResultWrapper} exact />
      </Routes>
    </Router>
  );
}

export default App;
