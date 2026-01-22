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
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        error: "",
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        error: "",
      };
    default:
      return state;
  }
};
