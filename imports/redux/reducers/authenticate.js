const defaultState = {
  user: null,
  login: false,
};

export default function authenticate(state = defaultState, action) {
  switch (action.type) {
    case 'SIGNIN':
      return {
        ...state,
        user: action.user,
        login: true,
      };
    case 'SIGNOUT':
      return {
        ...state,
        user: null,
        login: false,
      };
    default:
      return state;
  }
}
