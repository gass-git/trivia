import React, { useContext, useEffect } from 'react';
import { Col, Row, Container, Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../App';
import TableBody from './tableBody';

export default function Results() {
  const { state, dispatch } = useContext(AppContext)
  const [score, answers] = [state.score, state.answers]
  const navigate = useNavigate()

  useEffect(() => {
    dispatch({ type: 'deactivate quiz' })
  }, [dispatch])

  return [
    <Container
      key='results-key'
      className="mt-5"
    >

      {/* SCORE INFO */}
      <Row>
        <Col style={{ textAlign: 'center' }}>
          <h2>You scored</h2>
          <h3>{score} / {answers.length}</h3>
        </Col>
      </Row>

      {/* TABLE */}
      <Row className="mt-4 justify-content-center">
        <Col style={{ maxWidth: '700px' }}>
          <Table bordered hover>

            {/* TABLE HEADER */}
            <thead>
              <tr>
                <th style={{ minWidth: '80px', textAlign: 'center' }}>True?</th>
                <th style={{ textAlign: 'center' }}>Question</th>
                <th style={{ maxWidth: '100px', textAlign: 'center' }}>Correct?</th>
              </tr>
            </thead>

            {/* TABLE BODY */}
            <TableBody answers={answers} />

          </Table>
        </Col>
      </Row>

      <Row className="mt-4 mb-5">
        <Col style={{ textAlign: 'center' }}>

          {/* PLAY AGAIN BUTTON */}
          <Button
            className='btn-lg'
            variant='outline-dark'
            onClick={() => navigate('/')}
          >
            Play again ?
          </Button>

        </Col>
      </Row>

    </Container >
  ]
}