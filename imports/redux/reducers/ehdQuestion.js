const defaultState = {
  selectedQuestion: null,
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case 'SET_QUESTION_SELECT':
      return {
        ...state,
        selectedQuestion: action.question,
      };
    case 'SET_ANSWER_SELECT':
      return {
        ...state,
        selectedAnswer: action.answerNumber,
      };
    default:
      return state;
  }
}
