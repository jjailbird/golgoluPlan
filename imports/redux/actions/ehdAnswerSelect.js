export const SET_ANSWER_SELECT = 'SET_ANSWER_SELECT';

export function setAnswerSelect(selectIndex) {
  return {
    type: SET_ANSWER_SELECT,
    selectedIndex: selectIndex,
  };
}
