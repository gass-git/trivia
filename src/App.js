import React, { useEffect, useReducer } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import { specialChars } from "../src/data/specialChars.js";
import GetData from './api/getData';
import Quiz from './components/quiz';
import Results from './components/results';
import Home from './components/home';

export const AppContext = React.createContext(null)

function appReducer(state, action) {
  const { data, answers, score, current, fetchErrorCount } = state
  let [obj, question, newScore] = [{}, null, null]

  switch (action.type) {
    case 'API fetching error':
      return {
        ...state,
        fetchErrorCount: fetchErrorCount + 1
      }

    case 'activate quiz':
      return {
        ...state,
        isQuizActive: true
      }

    case 'activate results':
      return {
        ...state,
        isResultsActive: true
      }

    case 'check answer':
      question = data[current].question

      // Fix question      
      specialChars.forEach(special => {
        question = question.replace(special.code, special.char)
      })

      obj.id = current
      obj.question = question
      obj.correctAnswer = data[current].correct_answer

      if (action.answer === data[current].correct_answer) {
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

    case 'deactivate quiz':
      return {
        ...state,
        isQuizActive: false
      }

    case 'update data':
      return {
        ...state,
        data: action.data,
        isFetchPending: false
      }

    case 'reset state':
      return initialState

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
  isFetchPending: true,
  isQuizActive: false,
  isResultsActive: false
}

export default function App() {
  const [state, dispatch] = useReducer(appReducer, initialState)
  const { fetchErrorCount, isFetchPending, isQuizActive, isResultsActive } = state

  useEffect(() => {
    GetData({ fetchErrorCount, dispatch })
  }, [fetchErrorCount, isFetchPending])

  return [
    <AppContext.Provider value={{ state, dispatch }} key='context-key'>
      <Routes>
        <Route path='*' element={<Navigate to='/' />} />
        <Route path='/' element={<Home />} />
        <Route path='quiz' element={isQuizActive ? <Quiz /> : <Navigate to='/' />} />
        <Route path='results' element={isResultsActive ? <Results /> : <Navigate to='/' />} />
      </Routes>
    </AppContext.Provider>
  ]
}
