import React, { useContext, useEffect } from 'react';
import { Col, Row, Container, Badge, Table, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../App';

export default function Results() {

  const { state } = useContext(AppContext)
  const [score, answers, current] = [state.score, state.answers, state.current]
  const navigate = useNavigate()

  /**
   * @abstract
   * 
   * It's not allowed to access the results route if the 
   * trivia has not been completed 
   */
  useEffect(() => {
    if (current !== answers.length - 1) {
      navigate('/')
    }
  }, [current, answers.length, navigate])

  /**
   * @abstract
   * 
   * Component that map() the answers array
   * to build the table body.
   */
  const TableBody = () => {
    return [
      <tbody key='table-body-key'>
        {answers.map((answer) => {
          return [
            <tr key={answer.id}>

              {/* TRUE OR FALSE BADGE */}
              <td className="align-middle" style={{ textAlign: 'center' }}>
                <h6>
                  {
                    answer.correctAnswer === 'True' ?
                      <Badge bg="success">YES</Badge>
                      :
                      <Badge bg="secondary">NO</Badge>
                  }
                </h6>
              </td>

              {/* QUESTION */}
              <td>{answer.question}</td>

              {/* CHECK AND CROSS ICONS */}
              <td className="align-middle" style={{ textAlign: 'center' }}>
                {
                  answer.isCorrect ?
                    <FontAwesomeIcon icon={faCheck} className='check' />
                    :
                    <FontAwesomeIcon icon={faTimes} className='cross' />
                }
              </td>
            </tr>
          ]
        })}
      </tbody>
    ]
  }

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
            <TableBody />

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