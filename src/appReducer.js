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

export const ACTIONS = {
  API_FETCH_ERROR: { type: 'API fetch error' },
  ACTIVATE_QUIZ: { type: 'activate quiz' },
  ACTIVATE_RESULTS: { type: 'activate results' },
  CHECK_ANSWER: { type: 'check answer' },
  GO_TO_NEXT_QUESTION: { type: 'go to next question' },
  DEACTIVATE_QUIZ: { type: 'deactivate quiz' },
  UPDATE_DATA: { type: 'update data' },
  RESET_STATE: { type: 'reset state' }
}

export function AppReducer(state, action) {
  const { data, answers, score, current, fetchErrorCount } = state
  let [obj, question, newScore] = [{}, null, null]

  switch (action.type) {
    case ACTIONS.API_FETCH_ERROR.type:
      return {
        ...state,
        fetchErrorCount: fetchErrorCount + 1
      }

    case ACTIONS.ACTIVATE_QUIZ.type:
      return {
        ...state,
        isQuizActive: true
      }

    case ACTIONS.ACTIVATE_RESULTS.type:
      return {
        ...state,
        isResultsActive: true
      }

    case ACTIONS.CHECK_ANSWER.type:
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

    case ACTIONS.GO_TO_NEXT_QUESTION.type:
      return {
        ...state,
        current: current + 1
      }

    case ACTIONS.DEACTIVATE_QUIZ.type:
      return {
        ...state,
        isQuizActive: false
      }

    case ACTIONS.UPDATE_DATA.type:
      return {
        ...state,
        data: action.data,
        isFetchPending: false
      }

    case ACTIONS.RESET_STATE.type:
      return initialState

    default:
      return state;
  }
}