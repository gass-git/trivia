import React, { useContext, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../App';

export default function Home() {

  const { state, dispatch } = useContext(AppContext)
  const [current, answers] = [state.current, state.answers]
  const navigate = useNavigate()

  /**
   * @abstract
   * 
   * Reset the state only if the trivia has
   * been completed. This condition allows the user
   * to navigate back to home and forward to the trivia
   * and continue where he left of.
   * 
   */
  useEffect(() => {
    if (current === answers.length - 1) {
      dispatch({ type: 'reset state' })
    }
  }, [])

  return [
    <div
      id='home-wrapper'
      key='home-key'
      className="min-vh-100 d-flex align-items-center">
      <Container className="align-middle" style={{ width: '450px' }}>

        {/* WELCOME MESSAGE */}
        <Row>
          <Col style={{ textAlign: 'center' }}>
            <h1>Welcome to the Trivia Challenge!</h1>
          </Col>
        </Row>

        {/* SHORT EXPLAINER */}
        <Row className='row-one'>
          <Col className="mx-auto col-style">
            You will be presented with 10
            {' '}<strong className="text-success">True</strong>  or
            {' '}<strong className="text-danger">False</strong> questions.
          </Col>
        </Row>

        {/* THIRD PARAGRAPH */}
        <Row className="row-two">
          <Col className="mx-auto col-style">
            Can you score <strong>100%</strong> ?
          </Col>
        </Row>

        {/* START BUTTON */}
        <Row className="mt-4">
          <Col style={{ textAlign: 'center' }} >
            <Button
              className='btn-lg'
              variant='outline-dark'
              onClick={() => navigate('../quiz')}
            >
              <span className='m-3'>Get started</span>
            </Button>
          </Col>
        </Row>

      </Container>
    </div>
  ]
}