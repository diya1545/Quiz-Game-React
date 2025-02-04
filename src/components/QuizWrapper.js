import React from 'react';
import { useNavigate } from 'react-router-dom';
import Quiz from './Quiz'; // import your class component

const QuizWrapper = () => {
  const navigate = useNavigate();  // Use useNavigate hook here
  return <Quiz navigate={navigate} />;  // Pass navigate prop to the class component
};

export default QuizWrapper;
