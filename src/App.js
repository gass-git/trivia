import React, { useEffect, useReducer } from 'react';
import { Routes, Route } from "react-router-dom";
import { specialChars } from "../src/data/specialChars.js";

// API
import getData from './api/getData'

// Components
import Quiz from './components/Quiz.js';
import Results from './components/Results.js';
import Home from './components/Home.js';

export const AppContext = React.createContext(null)

function appReducer(state, action) {

  const { data, answers, score, current } = state

  switch (action.type) {

    case 'checkAnswer':
      let obj = {}
      let newScore
      let question = data[current].question
      let correctAnswer = data[current].correct_answer

      // Fix question      
      specialChars.forEach(special => {
        question = question.replace(special.code, special.char)
      })

      /** 
       * @abstract 
       * 
       * Populate the object and update the
       * score.
       */
      obj.id = current
      obj.question = question
      obj.correctAnswer = correctAnswer

      if (action.answer === correctAnswer) {
        obj.isCorrect = true
        newScore = score + 1
      }
      else {
        obj.isCorrect = false
        newScore = score
      }

      return {
        ...state,
        answers: [obj, ...answers],
        score: newScore
      }

    case 'gotoNextQuestion':
      return {
        ...state,
        current: current + 1
      }

    case 'updateData':
      return {
        ...state,
        data: action.data
      }

    case 'reset':
      return {
        ...state,
        answers: [],
        score: 0,
        current: 0
      }

    default:
      return initialState
  }
}
const initialState = {
  data: null,
  answers: [],
  score: 0,
  current: 0
}

export default function App() {

  const [state, dispatch] = useReducer(appReducer, initialState)

  useEffect(() => {
    getData({ dispatch })
  }, [])

  return [
    <AppContext.Provider value={{ state, dispatch }}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='quiz' element={<Quiz />} />
        <Route path='results' element={<Results />} />
      </Routes>
    </AppContext.Provider>
  ]
}
