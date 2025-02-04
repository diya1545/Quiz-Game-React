import React from 'react'
import {Helmet} from 'react-helmet';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons';

const Instruction = () => (
    <>
    <Helmet>
      <title>Instructions</title>
    </Helmet>
    <div className="container">
        <h1>How to Play the Game?</h1>
        <p>Ensure you read this guide from start to finish</p>
        <ul className="browser">
            <li>The game has a duration of 15 minutes and ends as soon as you start the game.</li>
            <li>This game consists of 10 questions.</li>
            <li>Every question contains 4 options.</li>
            <li>Select the option which best answers the question by clicking it.</li>
            <li>
                Each question has 2 lifelines namely:
                <ul className="sublist">
                    <li>50-50 chances</li>
                    <li>3 Hints</li>
                </ul>
            </li>
            <li>Selection a 50-50 lifeline by clicking this icon
                <span className='mdi mdi-set-center mdi-24px lifeline-icon'></span>
                 will remove 2 wrong answers, leaving the correct answer and one wrong answer
            </li>
            <li>Using a hint by clicking the icon
                <span className='mdi mdi-lightbulb-on mdi-24px lifeline-icon'></span>
                 will remove one wrong answer leaving two wrong answers and one correct answer.
            </li>
            <li>The timer starts as soon as the game starts.</li>
            <li>Feel free to quit the game at any time. In that case your score will be revealed afterwards.</li>
        </ul>
        <div className='button'>
            <span className='left'><Link to="/" className='left'><FontAwesomeIcon icon={faArrowLeftLong} />Back</Link> </span>
            <span className='right'><Link to="/start/quiz" className='right'>Start<FontAwesomeIcon icon={faArrowRightLong} /></Link> </span>
        </div>
    </div>
  </>
)


export default Instruction
