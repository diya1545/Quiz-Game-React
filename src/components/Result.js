/*import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

class Result extends Component {
    constructor(props) {
        super(props);
        this.state = {
            score: 0,
            numberofquestion: 0,
            correctAnswer: 0,
            wrongAnswer: 0,
            usedHints: 0,
            userName: '',
        };
    }

    componentDidMount() {
        const { state } = this.props.location || {};  // Access location prop

        if (state) {
            const { score, numberofquestion, correctAnswer, wrongAnswer, hintsUsed, userName } = state;
            this.setState({
                score: (numberofquestion > 0 && score !== undefined) ? (score / numberofquestion) * 100 : 0,
                numberofquestion,
                correctAnswer,
                wrongAnswer,
                usedHints: hintsUsed,
                userName,
            });
        }
    }

    render() {
        const { score, numberofquestion, correctAnswer, wrongAnswer, usedHints,userName } = this.state;
        const { state } = this.props.location || {};  // Ensure this state is passed from the wrapper
        let remark;

        if (score <= 30) {
            remark = "Practice More!!";
        } else if (score > 30 && score <= 50) {
            remark = "Better luck next time!";
        } else if (score > 50 && score <= 70) {
            remark = "You can do better!";
        } else if (score > 71 && score <= 84) {
            remark = "You did Great!";
        } else {
            remark = "You are a genius!";
        }

        const stats = state ? (
            <div className="result-container">
                <div>
                    <span className="mdi mdi-check-circle-outline success-icon"></span>
                </div>
                <h1>Quiz has ended</h1>
                <h4>{remark}</h4>
                <h2>Your Name: {userName}</h2>
                <h2>Your Score: {score.toFixed(0)}&#37;</h2>
                <h2>Total Questions: {numberofquestion}</h2>
                <h2>Correct Answers: {correctAnswer}</h2>
                <h2>Wrong Answers: {wrongAnswer}</h2>
                <h2>Hints Used: {usedHints}</h2>
                <section>
                    <ul>
                        <li><Link to="/">Back to Home</Link></li>
                        <li><Link to="/start/quiz">Play Again</Link></li>
                    </ul>
                </section>
            </div>
        ) : (
            <section className="result-container">
                <h1 className="no-stats">No statistics available</h1>
                <ul>
                    <li><Link to="/">Back to Home</Link></li>
                    <li><Link to="/start/quiz">Take a Quiz</Link></li>
                </ul>
            </section>
        );

        return (
            <>
                <Helmet>
                    <title>Result</title>
                </Helmet>
                {stats}
            </>
        );
    }
}

export default Result;*/

import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Result = () => {
  const location = useLocation(); // Hook to access the location state
  const [score, setScore] = useState(0);
  const [numberofquestion, setNumberOfQuestion] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [wrongAnswer, setWrongAnswer] = useState(0);
  const [usedHints, setUsedHints] = useState(0);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Destructure the state passed via navigation
    const { score, numberofquestion, correctAnswer, wrongAnswer, hintsUsed, userName } = location.state || {};
    
    if (location.state) {
      setScore((numberofquestion > 0 && score !== undefined) ? (score / numberofquestion) * 100 : 0);
      setNumberOfQuestion(numberofquestion);
      setCorrectAnswer(correctAnswer);
      setWrongAnswer(wrongAnswer);
      setUsedHints(hintsUsed);
      setUserName(userName || ''); // Ensure the username is being set
    }
  }, [location.state]);

  const remark = score <= 30 ? 'Practice More!!' :
    score <= 50 ? 'Better luck next time!' :
    score <= 70 ? 'You can do better!' :
    score <= 84 ? 'You did Great!' : 'You are a genius!';

  return (
    <>
      <Helmet>
        <title>Result</title>
      </Helmet>
      <div className="result-container">
        <div>
          <span className="mdi mdi-check-circle-outline success-icon"></span>
        </div>
        <h1>Quiz has ended</h1>
        <h4>{remark}</h4>
        <h2>Your Name: {userName || 'Guest'}</h2>
        <h2>Your Score: {score.toFixed(0)}&#37;</h2>
        <h2>Total Questions: {numberofquestion}</h2>
        <h2>Correct Answers: {correctAnswer}</h2>
        <h2>Wrong Answers: {wrongAnswer}</h2>
        <h2>Hints Used: {usedHints}</h2>
        <section>
          <ul>
            <li><Link to="/">Back to Home</Link></li>
            <li><Link to="/start/quiz">Play Again</Link></li>
          </ul>
        </section>
      </div>
    </>
  );
};

export default Result;
