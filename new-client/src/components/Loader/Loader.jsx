import React from 'react'
import './Loader.css';

export const Loader = () => {
  return (
    <div className="app-loader light">
      <h1 className="heading-primary">Loading...</h1>
      <div className="app-loader__wisk">
        <div className="app-loader__wisk-inner">
          <div className="app-loader__wisk-handle"></div>
          <div className="app-loader__wisk-wires"></div>
        </div>
      </div>
      <div className="app-loader__bowl"></div>
    </div>
  );
}
