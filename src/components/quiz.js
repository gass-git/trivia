import React, { useState, Fragment, useEffect } from 'react';
import { Navigate } from 'react-router-dom';



export default function Quiz({ data, answers, setAnswers, score, setScore }) {
  const [current, setCurrent] = useState(0);

  function handleClick(answer) {

    let obj = {}

    if (answer !== data[current].incorrect_answers[0]) {

      obj.question = data[current].question
      obj.isCorrect = true
      setAnswers([obj, ...answers])
      setScore(score + 1)
    }
    else {

      obj.question = data[current].question
      obj.isCorrect = false
      setAnswers([obj, ...answers])
    }

    setCurrent(current + 1)
  }

  return [
    <Fragment>

      {current === 10 ? <Navigate to='/results' /> : null}

      <div className='section-title'>
        <h2>Quiz</h2>
      </div>
      <br />

      {/* HEADLINE - Question category */}
      <h3>{data && current < 10 ? data[current].category : null}</h3>

      <br />
      {/* QUESTION */}
      <p>
        {data && current < 10 ? data[current].question : null}
      </p>

      <br />
      {/* QUESTION NUMBER */}
      <p>
        {data && current < 10 ? current : null}
      </p>

      <br />
      <button onClick={() => handleClick('True')}>
        True
      </button>

      <button onClick={() => handleClick('False')}>
        False
      </button>


    </Fragment>
  ]
}