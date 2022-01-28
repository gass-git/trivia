import React from 'react-dom'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'


export default function Home() {

  const navigate = useNavigate()

  return [
    <div id='home-wrapper' className="min-vh-100 d-flex align-items-center">
      <Container className="align-middle" style={{ width: '450px' }}>

        {/* WELCOME MESSAGE */}
        <Row>
          <Col style={{ textAlign: 'center' }}>
            <h1>Welcome to the Trivia Challenge!</h1>
          </Col>
        </Row>

        {/* SHORT EXPLAINER */}
        <Row style={{ marginTop: '80px' }}>
          <Col className="mx-auto col-style">
            You will be presented with 10
            {' '}<strong className="text-success">True</strong>  or
            {' '}<strong className="text-danger">False</strong> questions.
          </Col>
        </Row>

        {/* THIRD PARAGRAPH */}
        <Row style={{ marginTop: '70px' }}>
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