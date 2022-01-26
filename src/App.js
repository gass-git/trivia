import './styles/App.css';
import { Routes, Route, Link } from "react-router-dom";
import React, { useEffect, useState, Fragment } from 'react';
import getData from './api/getData'
import Quiz from './components/quiz'
import Results from './components/results'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  const [data, setData] = useState();
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    getData({ setData })
  }, [])

  const Home = () => {
    return [
      <div className='section-title'>
        <h2>Welcome to the challenge!</h2>
      </div>
    ]
  }

  return [
    <Fragment>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='quiz' element={<Quiz data={data} answers={answers} setAnswers={setAnswers} score={score} setScore={setScore} />} />
        <Route path='results' element={<Results answers={answers} score={score} />} />
      </Routes>
    </Fragment>
  ]
}
