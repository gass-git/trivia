import { Routes, Route } from "react-router-dom"
import React, { useEffect, useState, Fragment } from 'react'
import getData from './api/getData'
import Quiz from './components/quiz'
import Results from './components/results'
import Home from './components/home'


export default function App() {

  const [data, setData] = useState(),
    [answers, setAnswers] = useState([]),
    [score, setScore] = useState(0);


  useEffect(() => {
    getData({ setData })
  }, [])

  return [
    <Fragment>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='quiz' element={<Quiz data={data} answers={answers} setAnswers={setAnswers} score={score} setScore={setScore} />} />
        <Route path='results' element={<Results answers={answers} score={score} data={data} setAnswers={setAnswers} setScore={setScore} />} />
      </Routes>
    </Fragment>
  ]
}
