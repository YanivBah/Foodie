import React from 'react'
import './Footer.css';

export const Footer = () => {
  return (
    <div className="footer">
      <div className="links">
        <a href="https://github.com/YanivBah" target="_blank" rel="noreferrer">
          <i className="fab fa-github"></i>
        </a>

        <a
          href="https://www.linkedin.com/in/yanivbah/"
          target="_blank"
          rel="noreferrer"
        >
          <i className="fab fa-linkedin-in"></i>
        </a>
        <a href="mailto:ybahalker@gmail.com" target="_blank" rel="noreferrer">
          <i className="fas fa-envelope"></i>
        </a>
      </div>

      <div className="info">
        <span className="name">Yaniv Bahalker</span>
        <p>© Copyright 2021. All rights reserved.</p>
      </div>
    </div>
  );
}
