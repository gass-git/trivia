import './styles/App.css';
import { Routes, Route, Link } from "react-router-dom";
import { Fragment } from 'react';

function App() {

  const Home = () => {
    return [
      <div className='section-title'>
        <h2>Welcome to the challenge!</h2>
      </div>
    ]
  }

  const Quiz = () => {
    return [
      <div className='section-title'>
        <h2>Quiz</h2>
      </div>
    ]
  }

  const Results = () => {
    return [
      <div className='section-title'>
        <h2>Results</h2>
      </div>
    ]
  }

  return [
    <Fragment>
      <div className='nav'>
        <Link to="/">Home</Link>
        <Link to="/quiz">Quiz</Link>
        <Link to="results">Results</Link>
      </div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='quiz' element={<Quiz />} />
        <Route path='results' element={<Results />} />
      </Routes>
    </Fragment>
  ]
}

export default App;
