import React, { useEffect, useReducer } from 'react';
import { Routes, Route } from "react-router-dom";
import { specialChars } from "../src/data/specialChars.js";

// API
import GetData from './api/getData';

// Components
import Quiz from './components/quiz';
import Results from './components/results';
import Home from './components/home';


export const AppContext = React.createContext(null)

/**
 * @abstract State managment
 */
function appReducer(state, action) {
  const { data, answers, score, current, fetchErrorCount, isFetchPending } = state

  switch (action.type) {

    case 'API fetching error':
      return {
        ...state,
        fetchErrorCount: fetchErrorCount + 1
      }

    case 'check answer':
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

    case 'go to next question':
      return {
        ...state,
        current: current + 1
      }

    case 'update data':
      return {
        ...state,
        data: action.data,
        isFetchPending: false
      }

    case 'reset state':
      return {
        ...state,
        answers: [],
        score: 0,
        current: 0,
        fetchErrorCount: 0,
        isFetchPending: true
      }

    default:
      return initialState
  }
}

const initialState = {
  data: null,
  answers: [],
  score: 0,
  current: 0,
  fetchErrorCount: 0,
  isFetchPending: true
}

export default function App() {

  const [state, dispatch] = useReducer(appReducer, initialState)
  const [fetchErrorCount, isFetchPending] = [state.fetchErrorCount, state.isFetchPending]

  useEffect(() => {
    GetData({ fetchErrorCount, dispatch })
  }, [fetchErrorCount, isFetchPending])

  return [
    <AppContext.Provider value={{ state, dispatch }}>
      <Routes>
        <Route path='*' element={<Home />} />
        <Route path='/' element={<Home />} />
        <Route path='quiz' element={<Quiz />} />
        <Route path='results' element={<Results />} />
      </Routes>
    </AppContext.Provider>
  ]
}
