import React from 'react';
import { Helmet } from 'react-helmet';
import M from 'materialize-css';
import classnames from 'classnames';
import { useNavigate } from 'react-router-dom';

class Quiz extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: [], 
            currentQuestionIndex: 0,
            score: 0,
            correctAnswer: 0,
            wrongAnswer: 0,
            hints: 5,
            time: {},
            previousRandomNumbers: [],
            previousButton: true,
            nextButton: false,
        };
        this.interval = null;
    }

    componentDidMount() {
        this.fetchQuestions();
        this.startTimer();
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    // Fetch questions from the API
    fetchQuestions = async () => {
        try {
            const response = await fetch('https://opentdb.com/api.php?amount=15&category=9&difficulty=easy&type=multiple');
            const data = await response.json();
            if (data.results && data.results.length > 0) {
                this.setState({ questions: data.results }, this.displayQuestion);
            } else {
                console.error('No questions found in API response');
            }
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    };

    displayQuestion = () => {
        const { questions, currentQuestionIndex } = this.state;
        if (questions.length > 0) {
            const currentQuestion = questions[currentQuestionIndex];
            const options = [
                currentQuestion.correct_answer,
                ...currentQuestion.incorrect_answers
            ];
            this.shuffleArray(options);
    
            // Reset visibility of options when a new question appears
            const optionElements = document.querySelectorAll('.option');
            optionElements.forEach(option => {
                option.style.visibility = 'visible'; // Make sure all options are visible
            });
    
            this.setState({
                currentQuestion,
                options
            });
        }
    };
    

    // Shuffle options to randomize their positions
    shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Swap elements
        }
    };

    // Handle user's answer selection
    handleClick = (e) => {
        if (e.target.innerHTML.toLowerCase() === this.state.currentQuestion.correct_answer.toLowerCase()) {
            this.handleCorrectAnswer();
        } else {
            this.handleWrongAnswer();
        }
    };

    handleCorrectAnswer = () => {
        M.toast({
            html: 'Correct answer',
            classes: 'toast-valid',
            displayLength: 1500
        });
    
        this.setState(prevState => {
            const nextIndex = prevState.currentQuestionIndex + 1;
            
            if (nextIndex >= prevState.questions.length) {
                this.endGame(); 
                return {
                    score: prevState.score + 1,
                    correctAnswer: prevState.correctAnswer + 1,
                    currentQuestionIndex: prevState.currentQuestionIndex
                };
            }
            return {
                score: prevState.score + 1,
                correctAnswer: prevState.correctAnswer + 1,
                currentQuestionIndex: nextIndex
            };
        }, this.displayQuestion);
    };
    

    handleWrongAnswer = () => {
        navigator.vibrate(1000);
        M.toast({
            html: 'Wrong answer',
            classes: 'toast-invalid',
            displayLength: 1500
        });
    
        this.setState(prevState => {
            const nextIndex = prevState.currentQuestionIndex + 1;
            
            if (nextIndex >= prevState.questions.length) {
                this.endGame(); 
                return {
                    wrongAnswer: prevState.wrongAnswer + 1,
                    currentQuestionIndex: prevState.currentQuestionIndex
                };
            }

            return {
                wrongAnswer: prevState.wrongAnswer + 1,
                currentQuestionIndex: nextIndex
            };
        }, this.displayQuestion);
    };
    
    // Next button logic
    handleNextButton = () => {
        if (this.state.currentQuestionIndex < this.state.questions.length - 1) {
            this.setState(prevState => ({
                currentQuestionIndex: prevState.currentQuestionIndex + 1
            }), () => {
                this.displayQuestion();
                this.handleDisableButton(); // Disable buttons based on the current question
            });
        }
    };

    // Previous button logic
    handlePreviousButton = () => {
        if (this.state.currentQuestionIndex > 0) {
            this.setState(prevState => ({
                currentQuestionIndex: prevState.currentQuestionIndex - 1
            }), () => {
                this.displayQuestion();
                this.handleDisableButton(); // Disable buttons based on the current question
            });
        }
    };

    // Quit button logic
    handleQuitButton = () => {
        if (window.confirm("Are you sure you want to quit the game?")) {
            window.location.href = '/';
        }
    };

    // Handle hints logic
    handleHints = () => {
        if (this.state.hints > 0) {
            const options = Array.from(document.querySelectorAll('.option'));
            let indexOfAnswer;
    
            // Find the index of the correct answer
            options.forEach((option, index) => {
                if (option.innerHTML.toLowerCase() === this.state.currentQuestion.correct_answer.toLowerCase()) {
                    indexOfAnswer = index;
                }
            });
    
            // Find a random incorrect answer and hide it
            while (true) {
                const randomnumber = Math.round(Math.random() * 3);
                // Ensure the random option is not the correct answer and hasn't been used before
                if (randomnumber !== indexOfAnswer && !this.state.previousRandomNumbers.includes(randomnumber)) {
                    options.forEach((option, index) => {
                        if (index === randomnumber) {
                            option.style.visibility = 'hidden';
                            // Update the state to reflect the hint usage and hide this option
                            this.setState((prevState) => ({
                                hints: prevState.hints - 1,
                                previousRandomNumbers: prevState.previousRandomNumbers.concat(randomnumber)
                            }));
                        }
                    });
                    break;
                }
    
                // Prevent hint from being used more than 3 times
                if (this.state.previousRandomNumbers.length >= 3) break;
            }
        }
    };
    

    // Timer logic
    startTimer = () => {
        const countDown = Date.now() + 180000;
        this.interval = setInterval(() => {
            const now = new Date();
            const distance = countDown - now;

            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            if (distance < 0) {
                clearInterval(this.interval);
                this.setState({
                    time: {
                        minutes: 0,
                        seconds: 0
                    }
                }, () => {
                    this.endGame();
                });
            } else {
                this.setState({
                    time: {
                        minutes,
                        seconds
                    }
                });
            }
        });
    };

    handleDisableButton = () => {
        const { currentQuestionIndex, questions } = this.state;
    
        // Disable 'Previous' button on the first question
        if (currentQuestionIndex === 0) {
            this.setState({
                previousButton: true
            });
        } else {
            this.setState({
                previousButton: false
            });
        }
    
        if (currentQuestionIndex === questions.length - 1) {
            this.setState({
                nextButton: true
            });
        } else {
            this.setState({
                nextButton: false
            });
        }
    };

    endGame = () => {
        const { score, correctAnswer, wrongAnswer, hints, questions } = this.state;
        const playerStats = {
            score: score,
            numberofquestion: questions.length,
            numberofAnswerQuestion: correctAnswer + wrongAnswer,  
            correctAnswer: correctAnswer,
            wrongAnswer: wrongAnswer,
            hintsUsed: 5 - hints 
        };

        console.log(playerStats);
        setTimeout(() => {
            this.props.navigate('/play/quiz/result',{state : playerStats});
            // this.props.history.push('/play/quiz/result', playerStats);
        }, 1000);
    }

    render() {
        const { currentQuestion, currentQuestionIndex, options, hints, time, questions } = this.state;

        if (questions.length === 0) {
            return <div>Loading...</div>;
        }
        
        if (!currentQuestion || !options) {
            return <div>Loading...</div>;
        }

        return (
            <>
                <Helmet>
                    <title>Quiz Game</title>
                </Helmet>
                <div className="question">
                    <h2>Let's Win!!</h2>
                    <div className="lifeline-container">
                        <p>
                            <span className='mdi mdi-set-center mdi-24px lifeline-icon'><span className="lifeline">2</span></span>
                        </p>
                        <p>
                            <span onClick={this.handleHints}  className='mdi mdi-lightbulb-on-outline mdi-24px lifeline-icon'></span>
                            <span>{hints}</span>
                        </p>
                    </div>
                    <div className='icon'>
                        <p>
                            <span className='left'>
                                {currentQuestionIndex + 1} of {questions.length}
                            </span>
                            <span className='right'>{time.minutes}:{time.seconds}<span className='mdi mdi-clock-outline mdi-24px'></span></span>
                        </p>
                    </div>
                    <h4>{currentQuestion.question}</h4>
                    <div className='options-container'>
                        {options.map((option, index) => (
                            <p key={index} onClick={this.handleClick} className='option'>{option}</p>
                        ))}
                    </div>

                    <div className="button-container">
                        <button className={classnames('', {'disable' : this.state.previousButton})} onClick={this.handlePreviousButton}>Previous</button>
                        <button className={classnames('', {'disable' : this.state.nextButton})} onClick={this.handleNextButton}>Next</button>
                        <button onClick={this.handleQuitButton}>Quit</button>
                    </div>
                </div>
            </>
        );
    }
}

export default Quiz;

