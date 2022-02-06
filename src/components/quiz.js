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

  /**
   * @abstract
   * Loop to replace special HTML code inside
   * the question strings.
   * 
   * SpecialChars array can be found in 'src/data/' directory.
   */
  specialChars.forEach(special => {
    question = question.replace(special.code, special.char)
  })

  function handleClick(answer) {
    dispatch({ type: 'check answer', answer: answer })

    // Once the user answers the last question, navigate to results.
    if (current === data.length - 1) {
      dispatch({ type: 'activate results' })
      navigate('../results')
    }
    else {
      dispatch({ type: 'go to next question' })
    }
  }

  return [
    <div
      id='quiz-wrapper'
      key='quiz-key'
      className='min-vh-100 d-flex align-items-center'
    >
      <Container>
        <Row>
          <Col>
            <Card
              id='quiz-card'
              className='custom-card-size text-center mx-auto'
            >
              <Card.Body>

                {/* TITLE */}
                <Card.Title id='card-title' className='mt-3 p-3'>
                  <h2>{title}</h2>
                </Card.Title>

                {/* QUESTION */}
                <Card.Text id='card-text' className='p-3 fs-20'>
                  {question}
                </Card.Text>

                {/* BUTTONS */}
                <Button
                  id='quiz-btn-false'
                  className='m-2 btn-lg'
                  variant='outline-danger'
                  onClick={() => handleClick('False')}
                >
                  False
                </Button>
                <Button
                  id='quiz-btn-true'
                  className='m-2 btn-lg'
                  variant='outline-success'
                  onClick={() => handleClick('True')}
                >
                  True
                </Button>

              </Card.Body>

              <Card.Text className='mb-3 fs-18'>
                {current + 1} of {data.length}
              </Card.Text>

            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  ]
}