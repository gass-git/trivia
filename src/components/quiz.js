import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Row, Col, Container } from 'react-bootstrap';
import { specialChars } from '../data/specialChars';


export default function Quiz({ data, answers, setAnswers, score, setScore }) {

  const [current, setCurrent] = useState(0),
    navigate = useNavigate();

  let question,
    title,
    correctAnswer;

  if (data && current < 10) {

    title = data[current].category
    question = data[current].question
    correctAnswer = data[current].correct_answer

    // 
    specialChars.forEach(special => {
      question = question.replace(special.code, special.char)
    })
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

    if (current === data.length - 1) {
      navigate('../results')
    }

    setCurrent(current + 1)
  }


  return [
    <Container>
      <Row>
        <Col>
          <Card className="text-center mt-5 mx-auto" style={{ maxWidth: '500px', height: '550px' }}>

            <Card.Body>

              <Card.Title
                className="mt-4"
                style={{ fontSize: '30px', minHeight: '140px' }}
              >
                {title ? title : null}
              </Card.Title>

              <Card.Text
                style={{ fontSize: '20px', minHeight: '150px' }}
              >
                {question ? <p>{question}</p> : null}
              </Card.Text>

              <Button
                className="m-2"
                variant="outline-danger"
                style={{ fontSize: '20px', width: '100px' }}
                onClick={() => handleClick('False')}
              >
                False
              </Button>

              <Button
                className="m-2"
                variant="outline-success"
                style={{ fontSize: '20px', width: '100px' }}
                onClick={() => handleClick('True')}
              >
                True
              </Button>

            </Card.Body>

            <Card.Text style={{ fontSize: '18px' }} className="mb-3">{current + 1} of {data.length}</Card.Text>

          </Card>
        </Col>
      </Row>
    </Container>
  ]
}