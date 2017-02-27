const defaultState = {
  title: 'Golgoru Plan',
};

export default function changePage(state = defaultState, action) {
  switch (action.type) {
    case 'SET_PAGE_TITLE':
      return {
        ...state,
        title: action.pageTitle,
      };
    default:
      return state;
  }
}
