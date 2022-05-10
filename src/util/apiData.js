const LOGIN = "apiData/LOGIN";

export const login = (email, password) => {
  return {
    type: LOGIN,
    email: email,
    password: password,
  };
};

export default function apiData(state) {
  switch (state.type) {
    case LOGIN:
      return { ...state, email: state.email, password: state.password };
  }
}
