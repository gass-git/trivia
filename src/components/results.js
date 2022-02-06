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
    <Container key='results-key' className='mt-5'>

      {/* SCORE INFO */}
      <Row>
        <Col className='text-center'>
          <h2>You scored</h2>
          <h3>{score} / {answers.length}</h3>
        </Col>
      </Row>

      <Row className='mt-4 justify-content-center'>
        <Col id='table-col'>

          {/* TABLE */}
          <Table bordered hover>
            <thead>
              <tr>
                <th id='th-one' className='text-center'>True?</th>
                <th id='th-two' className='text-center'>Question</th>
                <th id='th-three' className='text-center'>Correct?</th>
              </tr>
            </thead>
            <TableBody answers={answers} />
          </Table>

        </Col>
      </Row>

      <Row className="mt-4 mb-5">
        <Col className='text-center'>

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