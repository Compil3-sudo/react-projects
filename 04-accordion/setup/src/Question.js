import React, { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

const Question = ({ data }) => {
  const [isDisplayed, setIsDisplayed] = useState(false);

  function displayAnswer() {
    setIsDisplayed(!isDisplayed);
  }

  return (
    <div className="container">
      <h2>question component</h2>
      {data.map((question) => {
        return (
          <>

            <h3>{question.title}</h3>
            <button className='btn' onClick={displayAnswer}><AiOutlinePlus /></button>

            <p>{isDisplayed && question.info}</p>
          </>
        );
      })}
    </div>
  );
};

export default Question;
