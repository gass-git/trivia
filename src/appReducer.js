import { specialChars } from "../src/data/specialChars.js";

export const initialState = {
  data: null,
  answers: [],
  score: 0,
  current: 0,
  fetchErrorCount: 0,
  isFetchPending: true,
  isQuizActive: false,
  isResultsActive: false
}

export function AppReducer(state, action) {
  const { data, answers, score, current, fetchErrorCount } = state
  let [obj, question, newScore] = [{}, null, null]

  switch (action.type) {
    case 'API fetching error':
      return {
        ...state,
        fetchErrorCount: fetchErrorCount + 1
      }

    case 'activate quiz':
      return {
        ...state,
        isQuizActive: true
      }

    case 'activate results':
      return {
        ...state,
        isResultsActive: true
      }

    case 'check answer':
      question = data[current].question

      // Fix question      
      specialChars.forEach(special => {
        question = question.replace(special.code, special.char)
      })

      obj.id = current
      obj.question = question
      obj.correctAnswer = data[current].correct_answer

      if (action.answer === data[current].correct_answer) {
        obj.isCorrect = true
        newScore = score + 1
      }
      else {
        obj.isCorrect = false
        newScore = score
      }

      return {
        ...state,
        answers: [...answers, obj],
        score: newScore
      }

    case 'go to next question':
      return {
        ...state,
        current: current + 1
      }

    case 'deactivate quiz':
      return {
        ...state,
        isQuizActive: false
      }

    case 'update data':
      return {
        ...state,
        data: action.data,
        isFetchPending: false
      }

    case 'reset state':
      return initialState

    default:
      return initialState
  }
}