/*import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import io from 'socket.io-client'

const socket = io('http://localhost:5000'); 
const Home = () => (
    <>
    <Helmet>
      <title>Quiz Game</title>
    </Helmet>
    <div className="home">
        <section>
            <h1>Quiz Game</h1>
            <input type="text" id="name" placeholder='Enter Name' />
            <div className="play-button">
                <ul>
                    <li><Link className='play' to="/play/instructions">Play</Link> </li>
                </ul>
            </div>
            <div className="auth">
                <Link to="/login" className='login'>Login</Link>
                <Link to="/register" className='signup'>Register</Link>
            </div>
        </section>
    </div>
    </>
)

export default Home*/


import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Home = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  // Handle the input change
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  // Handle form submission to check if name is entered
  const handlePlay = () => {
    if (name.trim() === '') {
      alert('Please enter your name before playing!');
      return;
    }
    // Navigate to the instructions page with the name
    navigate('/play/instructions', { state: { userName: name } });
  };

  return (
    <>
      <Helmet>
        <title>Quiz Game</title>
      </Helmet>
      <div className="home">
        <section>
          <h1>Quiz Game</h1>
          <input
            type="text"
            id="name"
            placeholder="Enter Name"
            value={name}
            onChange={handleNameChange}
          />
          <div className="play-button">
            <ul>
              <li>
                <button className="play" onClick={handlePlay}>
                  Play
                </button>
              </li>
            </ul>
          </div>
          {/* <div className="auth">
            <Link to="/login" className="login">
              Login
            </Link>
            <Link to="/register" className="signup">
              Register
            </Link>
          </div> */}
        </section>
      </div>
    </>
  );
};

export default Home;
