import { Fragment, useEffect, useState } from 'react'
import React from 'react-router-dom'
import { Col, Row, Container, Badge, Table, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';

export default function Results({ answers, score, setAnswers, setScore }) {

  const navigate = useNavigate();

  function handleClick() {

    setScore(0)
    setAnswers([])
    navigate('/')
  }

  return [

    <Container className="mt-5">
      <Row>
        <Col></Col>
        <Col xs={8} style={{ textAlign: 'center' }}>
          <h2>You scored</h2>
          <h3>{score} / {answers.length}</h3>
        </Col>
        <Col></Col>
      </Row>


      <Row className="mt-2">
        <Col></Col>
        <Col xs={8}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Is it true or false?</th>
                <th>Question</th>
                <th>Correct Answer?</th>
              </tr>
            </thead>
            <tbody>
              {
                answers.map((answer, i) => {
                  return [
                    <tr>
                      <td>
                        <h5>
                          {
                            answer.correctAnswer === 'True' ?
                              <Badge bg="success">True</Badge>
                              :
                              <Badge bg="secondary">False</Badge>
                          }
                        </h5>
                      </td>
                      <td>{answer.question}</td>
                      <td>{
                        answer.isCorrect ?
                          <FontAwesomeIcon style={{ color: 'green', fontSize: '30px' }} icon={faCheck} />
                          :
                          <FontAwesomeIcon style={{ color: 'red', fontSize: '30px' }} icon={faTimes} />
                      }
                      </td>
                    </tr>
                  ]
                })
              }
            </tbody>
          </Table>
        </Col>
        <Col></Col>
      </Row>

      <Row className="mt-3">
        <Col></Col>
        <Col xs={8} style={{ textAlign: 'center' }}>
          <Button onClick={() => handleClick()}>PLAY AGAIN ?</Button>
        </Col>
        <Col></Col>
      </Row>

    </Container >
  ]
}