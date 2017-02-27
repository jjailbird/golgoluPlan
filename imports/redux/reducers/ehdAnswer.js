const defaultState = {
  index: null,
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case 'SET_ANSWER_SELECT':
      return {
        ...state,
        title: action.selectIndex,
      };
    default:
      return state;
  }
}
