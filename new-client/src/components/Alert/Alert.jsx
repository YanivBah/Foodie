import React from 'react';
import './Alert.css';

export const Alert = ({details}) => {
  const { header, text, type } = details;
  return (
    <div className={`alert ${type}`}>
      <div className="heading">
        {type === "red" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="fill-current w-5 pt-1"
            viewBox="0 0 24 24"
          >
            <path d="M12 1l-12 22h24l-12-22zm-1 8h2v7h-2v-7zm1 11.25c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25z" />
          </svg>
        )}
        {type === "green" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="fill-current w-5 pt-1"
            viewBox="0 0 24 24"
          >
            <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.959 17l-4.5-4.319 1.395-1.435 3.08 2.937 7.021-7.183 1.422 1.409-8.418 8.591z" />
          </svg>
        )}

        <h3>{header}</h3>
      </div>
      <div>{text}</div>
    </div>
  );
}
