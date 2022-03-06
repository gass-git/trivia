export type stateTypes = {
  data: any;
  answers: any[];
  score: number;
  current: number;
  fetchErrorCount: number;
  isFetchPending: boolean;
  isQuizActive: boolean;
  isResultsActive: boolean;
}

export type answersTypes = {
  id: number;
  correctAnswer: string;
  question: string;
  isCorrect: boolean;
}