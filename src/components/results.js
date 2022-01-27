import React, { useContext } from 'react'
import { Col, Row, Container, Badge, Table, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../App'

export default function Results() {

  const { state, dispatch } = useContext(AppContext)
  const [score, answers] = [state.score, state.answers]
  const navigate = useNavigate()

  function handleClick() {
    dispatch({ type: 'reset' })
    navigate('/')
  }

  return [

    <Container className="mt-4" key='results-container-key'>
      <Row>
        <Col style={{ textAlign: 'center' }}>
          <h2>You scored</h2>
          <h3>{score} / {answers.length}</h3>
        </Col>
      </Row>

      <Row className="mt-4 justify-content-center">
        <Col style={{ maxWidth: '700px' }}>
          <Table bordered hover>
            <thead>
              <tr>
                <th style={{ width: '100px', textAlign: 'center' }}>True?</th>
                <th style={{ textAlign: 'center' }}>Question</th>
                <th style={{ width: '100px', textAlign: 'center' }}>Correct?</th>
              </tr>
            </thead>
            <tbody>
              {
                answers.map((answer) => {
                  return [
                    <tr key={answer.id}>
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
                      <td>{answer.question}</td>
                      <td className="align-middle" style={{ textAlign: 'center' }}>
                        {
                          answer.isCorrect ?
                            <FontAwesomeIcon style={{ color: 'green', fontSize: '25px' }} icon={faCheck} />
                            :
                            <FontAwesomeIcon style={{ color: 'red', fontSize: '25px' }} icon={faTimes} />
                        }
                      </td>
                    </tr>
                  ]
                })
              }
            </tbody>
          </Table>
        </Col>
      </Row>

      <Row className="mt-4 mb-5">
        <Col style={{ textAlign: 'center' }}>
          <Button variant='outline-primary' onClick={() => handleClick()}>PLAY AGAIN ?</Button>
        </Col>
      </Row>

    </Container >
  ]
}