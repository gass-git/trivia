import { Routes, Route, Link } from "react-router-dom";
import React, { useEffect, useState, Fragment } from 'react';
import getData from './api/getData'
import Quiz from './components/quiz'
import Results from './components/results'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

export default function App() {
  const [data, setData] = useState();
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  if (data) {
    console.log(data)
  }

  useEffect(() => {
    getData({ setData })
  }, [])

  const Home = () => {
    return [
      <Container className="mt-5">
        <Row className="justify-content-md-center">
          <Col md="auto">
            <h2>Welcome to the Trivia Challenge!</h2>
          </Col>
        </Row>
        <Row className="justify-content-md-center mt-5">
          <Col style={{ width: '400px', textAlign: 'center' }} className="mt-5" md="auto" >
            <h4>You will be presented with 10 True or False questions.</h4>
          </Col>
        </Row>
        <Row className="justify-content-md-center mt-5">
          <Col style={{ width: '400px', textAlign: 'center' }} className="mt-5" md="auto" >
            <h4>Can you score 100% ?</h4>
          </Col>
        </Row>
        <Row className="justify-content-md-center mt-3">
          <Col style={{ width: '400px', textAlign: 'center' }} className="mt-5" md="auto" >
            <Button
              variant="outline-dark"
              style={{ fontSize: '20px' }}
              onClick={() => navigate('quiz')}>
              BEGIN
            </Button>
          </Col>
        </Row>
      </Container>
    ]
  }

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
