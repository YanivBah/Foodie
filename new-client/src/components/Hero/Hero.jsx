import React, { useContext } from 'react'
import './Hero.css';
import Context from "../../Context";
import { Link } from 'react-router-dom';


export const Hero = () => {
  const { user } = useContext(Context);
  const notLoggedIn = ['Interact with other people', 'Share your recipes', `Rate other's recipes`];
  const loggedIn = ['Find what to cook for today', 'Tell users how it went'];
  return (
    <div className="hero">
      <div className="hero-bg"></div>
      <div className="hero-content">
        <div className="hero-text">
          <h1>{!user.get ? "Join our community!" : `What's cooking?`}</h1>
          {!user.get && <p><Link to="/signup">Click here to signup</Link></p>}
          <ul>
            {!user.get && notLoggedIn.map((li, index) => <li key={index}>{li}</li>)}
            {user.get && loggedIn.map((li, index) => <li key={index}>{li}</li>)}
          </ul>
        </div>
        <div className="hero-image">
          <img src="./assets/hero-new.svg" alt="man sitting" />
        </div>
      </div>
    </div>
  );
}
