export const SET_QUESTION_SELECT = 'SET_QUESTION_SELECT';
export const SET_ANSWER_SELECT = 'SET_ANSWER_SELECT';

export function setQuestionSelect(question) {
  return {
    type: SET_QUESTION_SELECT,
    question,
  };
}

export function setAnswerSelect(answerNumber) {
  return {
    type: SET_ANSWER_SELECT,
    answerNumber,
  };
}
