import { specialChars } from "./data/specialChars";

type stateTypes = {
  data: any;
  answers: any[];
  score: number;
  current: number;
  fetchErrorCount: number;
  isFetchPending: boolean;
  isQuizActive: boolean;
  isResultsActive: boolean;
}

const initialState: stateTypes = {
  data: null,
  answers: [],
  score: 0,
  current: 0,
  fetchErrorCount: 0,
  isFetchPending: true,
  isQuizActive: false,
  isResultsActive: false,
}

const ACTIONS: Record<string, string> = {
  FETCH_ERROR: 'API fetch error',
  ACTIVATE_QUIZ: 'activate quiz',
  ACTIVATE_RESULTS: 'activate results',
  CHECK_ANSWER: 'check current answer',
  NEXT_QUESTION: 'go to next question',
  DEACTIVATE_QUIZ: 'deactivate quiz',
  UPDATE_DATA: 'update all the data',
  RESET_STATE: 'reset all the state'
}

function AppReducer(state: stateTypes, action: any) {
  const { data, answers, score, current, fetchErrorCount } = state

  type dataObjType = {
    id: number | null,
    question: string | null,
    correctAnswer: number,
    isCorrect: boolean | null
  }

  let obj: dataObjType = { id: null, question: '', correctAnswer: null, isCorrect: null }

  let question: string | null = ''
  let newScore: number | null = 0

  switch (action.type) {
    case ACTIONS.FETCH_ERROR:
      return {
        ...state,
        fetchErrorCount: fetchErrorCount + 1
      }

    case ACTIONS.ACTIVATE_QUIZ:
      return {
        ...state,
        isQuizActive: true
      }

    case ACTIONS.ACTIVATE_RESULTS:
      return {
        ...state,
        isResultsActive: true
      }

    case ACTIONS.CHECK_ANSWER:
      question = data[current].question

      // Fix question      
      specialChars.forEach((special: { code: any, char: string }) => {
        question = question!.replace(special.code, special.char)
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

    case ACTIONS.NEXT_QUESTION:
      return {
        ...state,
        current: current + 1
      }

    case ACTIONS.DEACTIVATE_QUIZ:
      return {
        ...state,
        isQuizActive: false
      }

    case ACTIONS.UPDATE_DATA:
      return {
        ...state,
        data: action.data,
        isFetchPending: false
      }

    case ACTIONS.RESET_STATE:
      return initialState

    default:
      return state;
  }
}

export { initialState, ACTIONS, AppReducer };