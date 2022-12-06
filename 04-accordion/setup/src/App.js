import React, { useState } from 'react';
import data from './data';
import Question from './Question';
import SingleQuestion from './Question';

function App() {
  return (
    <>
      <div className="container">
        <h2>accordion project setup</h2>
      </div>
      <Question data={data} />
    </>
  );
}

export default App;
