import React from 'react';
import { Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

export default function TableBody({ answers }) {
  return [
    <tbody key='table-body-key'>
      {answers.map((answer) => {
        return [
          <tr key={answer.id}>

            {/* TRUE OR FALSE BADGE */}
            <td className='align-middle text-center'>
              <h6>
                {
                  answer.correctAnswer === 'True' ?
                    <Badge bg='success'>YES</Badge>
                    :
                    <Badge bg='secondary'>NO</Badge>
                }
              </h6>
            </td>

            {/* QUESTION */}
            <td>{answer.question}</td>

            {/* CHECK AND CROSS ICONS */}
            <td className='align-middle text-center'>
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