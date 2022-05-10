<<<<<<< HEAD
const LOGIN = "apiData/LOGIN";

export const login = (email, password) => {
  return {
    type: LOGIN,
=======
const SIGNIN = "apiData";

export const signin = (email, password) => {
  return {
    type: SIGNIN,
>>>>>>> e691f6252be123b27c32e375ef7c592f42efdb10
    email: email,
    password: password,
  };
};

export default function apiData(state) {
  switch (state.type) {
<<<<<<< HEAD
    case LOGIN:
=======
    case SIGNIN:
>>>>>>> e691f6252be123b27c32e375ef7c592f42efdb10
      return { ...state, email: state.email, password: state.password };
  }
}
