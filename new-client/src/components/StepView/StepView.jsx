import React from 'react';
import './StepView.css';

export const StepView = ({instruction, index}) => {

  const addingSpacing = () => {
    const splitted = instruction.content.split('\n');
    return splitted.map((paragraph,index) => {
      if (paragraph === '') {
        return null;
      }
      return (
        <React.Fragment key={index}>
          <p>{paragraph}</p>
          {index !== splitted.length && <br/>}
        </React.Fragment>
      );
    })
  };

  return (
    <div className="step-view">
        <span className="number">Step {index + 1}</span>
        {addingSpacing()}
    </div>
  );
}
