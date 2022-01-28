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

  /**
   * @abstract
   * 
   * This component maps the answers array
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

              {/* CHECK OR CROSS ICON */}
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
    <Container className="mt-5" key='results-container-key'>

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
                <th style={{ width: '100px', textAlign: 'center' }}>True?</th>
                <th style={{ textAlign: 'center' }}>Question</th>
                <th style={{ width: '100px', textAlign: 'center' }}>Correct?</th>
              </tr>
            </thead>

            {/* TABLE BODY */}
            <TableBody />

          </Table>
        </Col>
      </Row>

      <Row className="mt-4 mb-5">
        <Col style={{ textAlign: 'center' }}>
          <Button
            className='btn-lg'
            variant='outline-dark'
            onClick={() => handleClick()}
          >
            Play again ?
          </Button>
        </Col>
      </Row>

    </Container >
  ]
}