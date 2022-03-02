import React, { useEffect, useReducer } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import GetData from './api/getData';
import Quiz from './components/quiz';
import Results from './components/results';
import Home from './components/home';
import { AppReducer } from './appReducer.js';
import { initialState } from './appReducer.js';

export const AppContext = React.createContext(null)

export function App() {
  const [state, dispatch] = useReducer(AppReducer, initialState)
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

