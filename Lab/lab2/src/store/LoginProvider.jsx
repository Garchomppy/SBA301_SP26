import { useReducer } from "react";
import {
  LoginContext,
  loginReducer,
  initialState,
} from "./login/loginReducer.js";

export const LoginProvider = ({ children }) => {
  const [state, dispatch] = useReducer(loginReducer, initialState);

  return (
    <LoginContext.Provider value={[state, dispatch]}>
      {children}
    </LoginContext.Provider>
  );
};
