import { Fragment, useEffect, useState } from 'react'
import React from 'react-router-dom'

export default function Results({ answers, score }) {


  return [
    <div className='section-title'>

      <h2>Results</h2>
      <br />

      <h3>Score: {score} / {answers.length}</h3>

      <br />
      <p>
        {
          answers.map(answer => {
            return [
              <Fragment>
                <p>
                  <p>{answer.question}</p>
                  <p>Correct: {answer.isCorrect ? 'yes' : 'no'}</p>
                </p>
                <br />
              </Fragment>
            ]
          })
        }
      </p>

    </div>
  ]
}