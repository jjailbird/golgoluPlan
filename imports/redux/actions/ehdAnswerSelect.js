export const SET_ANSWER_SELECT = 'SET_ANSWER_SELECT';

export function setAnswerSelect(questionNo, selectIndex) {
  return {
    type: SET_ANSWER_SELECT,
    questionNo,
    selectIndex,
  };
}
