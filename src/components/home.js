import React from 'react-dom'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'


export default function Home() {

  const navigate = useNavigate()

  return [
    <Container className="mt-5">

      <Row>
        <Col style={{ textAlign: 'center' }}>
          <h2>Welcome to the Trivia Challenge!</h2>
        </Col>
      </Row>

      <Row style={{ marginTop: '100px' }}>
        <Col className="mx-auto" style={{ textAlign: 'center', maxWidth: '400px' }}>
          <h4>You will be presented with 10 True or False questions.</h4>
        </Col>
      </Row>

      <Row style={{ marginTop: '100px' }}>
        <Col className="mx-auto" style={{ textAlign: 'center' }}>
          <h4>Can you score 100% ?</h4>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col style={{ textAlign: 'center' }} >
          <Button
            variant="outline-dark"
            style={{ fontSize: '20px' }}
            onClick={() => navigate('quiz')}
          >
            BEGIN
          </Button>
        </Col>
      </Row>

    </Container>
  ]
}