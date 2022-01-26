import React, { useState, Fragment, useEffect, Text } from 'react';
import { Navigate } from 'react-router-dom';
import { Button, Card, Row, Stack } from 'react-bootstrap';


export default function Quiz({ data, answers, setAnswers, score, setScore }) {
  const [current, setCurrent] = useState(0);

  let question, title;

  if (data && current < 10) {

    title = data[current].category
    question = data[current].question
    question = question.replace(/&quot;/g, '"')
    question = question.replace(/&#039;/g, "'")
  }


  function handleClick(answer) {

    let obj = {}

    if (answer !== data[current].incorrect_answers[0]) {

      obj.question = question
      obj.isCorrect = true
      setAnswers([obj, ...answers])
      setScore(score + 1)
    }
    else {

      obj.question = question
      obj.isCorrect = false
      setAnswers([obj, ...answers])
    }

    setCurrent(current + 1)
  }


  return [
    <Row className="justify-content-md-center">


      {current === 10 ? <Navigate to='/results' /> : null}

      <Card className="text-center mt-5" style={{ width: '400px', height: '450px' }}>
        <Card.Body>

          <Card.Title style={{ fontSize: '35px' }}>
            {title ? title : null}
          </Card.Title>

          <Card.Text className="mt-5 mb-5" style={{ fontSize: '20px' }}>
            {question ? <p>{question}</p> : null}
          </Card.Text>

          <Stack direction="horizontal" className="mt-5 col-md-5 mx-auto" gap={3}>
            <Button style={{ fontSize: '18px' }} onClick={() => handleClick('False')}>
              False
            </Button>

            <Button variant="success" style={{ fontSize: '18px' }} onClick={() => handleClick('True')}>
              True
            </Button>
          </Stack>

        </Card.Body>

        <Card.Text style={{ fontSize: '17px' }} className="mb-3">{current} of 10</Card.Text>

      </Card>

    </Row>
  ]
}