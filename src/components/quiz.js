import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Row, Col, Container } from 'react-bootstrap';
import { specialChars } from '../data/specialChars';
import { AppContext } from '../App';

export default function Quiz() {

  const { state, dispatch } = useContext(AppContext)
  const [data, current] = [state.data, state.current]

  const navigate = useNavigate()
  const title = data[current].category
  let question = data[current].question

  // Fix question 
  specialChars.forEach(special => {
    question = question.replace(special.code, special.char)
  })

  function handleClick(answer) {

    dispatch({
      type: 'checkAnswer',
      answer: answer
    })

    if (current === data.length - 1) {
      navigate('../results')
    }

    dispatch({ type: 'gotoNextQuestion' })
  }

  return [
    <Container>
      <Row>
        <Col>
          <Card
            className="text-center mt-5 mx-auto"
            style={{ maxWidth: '500px', height: '550px' }}
          >
            <Card.Body>
              <Card.Title
                className="mt-4 p-3"
                style={{ minHeight: '140px' }}
              >
                <h2>{title ? title : null}</h2>
              </Card.Title>

              <Card.Text
                className='p-3'
                style={{ minHeight: '150px' }}
              >
                <h5>{question ? question : null}</h5>
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