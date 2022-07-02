import { useReducer } from "react";
import CurUserContext from "./curUser-context";

const defaultCurUserState = {
  user: undefined,
};

const curUserReducer = (state, action) => {
  if (action.type === "LOGIN") {
    return { user: action.user };
  }
  if (action.type === "LOGOUT") {
    return {
      user: undefined,
    };
  }
  return defaultCurUserState;
};

const CurUserProvider = (props) => {
  const [curUserState, dispatchCurUserAction] = useReducer(
    curUserReducer,
    defaultCurUserState
  );
  const login = (user) => {
    dispatchCurUserAction({ type: "LOGIN", user: user });
  };

  const logout = () => {
    dispatchCurUserAction({ type: "LOGOUT" });
  };

  const curUserContext = {
    user: curUserState.user,
    login: login,
    logout: logout,
  };

  return (
    <CurUserContext.Provider value={curUserContext}>
      {props.children}
    </CurUserContext.Provider>
  );
};

export default CurUserProvider;
