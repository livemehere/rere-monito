const SIGNIN = "apiData";

export const signin = (email, password) => {
  return {
    type: SIGNIN,
    email: email,
    password: password,
  };
};

export default function apiData(state) {
  switch (state.type) {
    case SIGNIN:
      return { ...state, email: state.email, password: state.password };
  }
}
