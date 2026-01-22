import { createContext } from "react";
export const LoginContext = createContext();

export const initialState = {
  isAuthenticated: false,
  user: null,
  error: "",
};

export const loginReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      const newStateSuccess = {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        error: "",
      };
      console.log("New state after LOGIN_SUCCESS:", newStateSuccess);
      return newStateSuccess;
    case "LOGIN_FAILURE":
      const newStateFailure = {
        ...state,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
      console.log("New state after LOGIN_FAILURE:", newStateFailure);
      return newStateFailure;
    case "LOGOUT":
      const newStateLogout = {
        ...state,
        isAuthenticated: false,
        user: null,
        error: "",
      };
      console.log("New state after LOGOUT:", newStateLogout);
      return newStateLogout;
    default:
      return state;
  }
};
