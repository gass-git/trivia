import { Routes, Route } from "react-router-dom"
import React, { useEffect, useReducer } from 'react'
import getData from './api/getData'
import Quiz from './components/quiz'
import Results from './components/results'
import Home from './components/home'
import { specialChars } from "../src/data/specialChars"


function appReducer(state, action) {
  switch (action.type) {

    case 'checkAnswer':

      let obj = {}
      let newScore
      let question = state.data[state.current].question
      let correctAnswer = state.data[state.current].correct_answer

      specialChars.forEach(special => {
        question = question.replace(special.code, special.char)
      })


      if (action.answer === correctAnswer) {
        obj.isCorrect = true
        newScore = state.score + 1
      }
      else {
        obj.isCorrect = false
        newScore = state.score
      }

      obj.question = question
      obj.correctAnswer = correctAnswer

      return {
        ...state,
        answers: [obj, ...state.answers],
        score: newScore
      }

    case 'gotoNextQuestion':
      return {
        ...state,
        current: state.current + 1
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
    <Routes>
      <Route path='/' element={<Home />} />
      <Route
        path='quiz'
        element={<Quiz data={state.data} current={state.current} dispatch={dispatch} />}
      />
      <Route
        path='results'
        element={<Results answers={state.answers} score={state.score} dispatch={dispatch} />}
      />
    </Routes>
  ]
}
