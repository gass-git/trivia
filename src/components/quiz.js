import React, { useState, Fragment, useEffect, Text } from 'react';
import { Navigate } from 'react-router-dom';
import { Button, Card, Row, Col, Container } from 'react-bootstrap';


export default function Quiz({ data, answers, setAnswers, score, setScore }) {
  const [current, setCurrent] = useState(0);

  let question, title, correctAnswer;

  if (data && current < 10) {

    title = data[current].category
    question = data[current].question
    correctAnswer = data[current].correct_answer
    question = question.replace(/&quot;/g, '"')
    question = question.replace(/&#039;/g, "'")
    question = question.replace(/&ocirc;/g, "ô")
  }


  function handleClick(answer) {

    let obj = {}

    if (answer === correctAnswer) {

      obj.question = question
      obj.isCorrect = true
      obj.correctAnswer = correctAnswer
      setAnswers([obj, ...answers])
      setScore(score + 1)
    }
    else {

      obj.question = question
      obj.isCorrect = false
      obj.correctAnswer = correctAnswer
      setAnswers([obj, ...answers])
    }

    setCurrent(current + 1)
  }


  return [
    <Container>
      <Row className="justify-content-md-center">


        {current === 10 ? <Navigate to='/results' /> : null}
        <Col>
          <Card className="text-center mt-5 mx-auto" style={{ width: '400px', height: '550px' }}>
            <Card.Body>

              <Card.Title style={{ fontSize: '30px', minHeight: '100px' }}>
                {title ? title : null}
              </Card.Title>

              <Card.Text className="mt-5 mb-5" style={{ fontSize: '20px', minHeight: '150px' }}>
                {question ? <p>{question}</p> : null}
              </Card.Text>


              <Button className="m-2" style={{ fontSize: '18px' }} onClick={() => handleClick('False')}>
                False
              </Button>

              <Button className="m-2" variant="success" style={{ fontSize: '18px' }} onClick={() => handleClick('True')}>
                True
              </Button>


            </Card.Body>

            <Card.Text style={{ fontSize: '17px' }} className="mb-3">{current} of 10</Card.Text>

          </Card>
        </Col>
      </Row>
    </Container>
  ]
}