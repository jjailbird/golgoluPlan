export const STATUS = 'STATUS';
export const SIGNIN = 'SIGNIN';
export const SIGNOUT = 'SIGNOUT';

export function signin(user) {
  return {
    type: SIGNIN,
    user,
  };
}

export function signout() {
  return {
    type: SIGNOUT,
    user: null,
  };
}
