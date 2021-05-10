import React from 'react';
import './StepView.css';

export const StepView = ({instruction, index}) => {
  return (
    <div className="step-view">
      <p>
        <span className="number">Step {index + 1}</span>
        {instruction.description}
      </p>
    </div>
  );
}
