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
    <div id='quiz-wrapper' className="min-vh-100 d-flex align-items-center">
      <Container key='quiz-container-key'>
        <Row>
          <Col>
            <Card id='quiz-card' className="text-center mx-auto custom-card-size">
              <Card.Body>

                {/* TITLE */}
                <Card.Title
                  className="mt-3 p-3"
                  style={{ minHeight: '140px' }}
                >
                  <h2>{title ? title : null}</h2>
                </Card.Title>

                {/* QUESTION */}
                <Card.Text
                  className='p-3 fs-20'
                  style={{ minHeight: '150px' }}
                >
                  {question ? question : null}
                </Card.Text>

                {/* BUTTONS */}
                <Button
                  id="quiz-btn-false"
                  className="m-2 btn-lg"
                  variant="outline-danger"
                  onClick={() => handleClick('False')}
                >
                  False
                </Button>
                <Button
                  id="quiz-btn-true"
                  className="m-2 btn-lg"
                  variant="outline-success"
                  onClick={() => handleClick('True')}
                >
                  True
                </Button>

              </Card.Body>

              <Card.Text className="mb-3 fs-18">
                {current + 1} of {data.length}
              </Card.Text>

            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  ]
}