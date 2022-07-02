import React, { createContext } from "react";

const CurUserContext = createContext({
  user: undefined,
  login: (user) => {},
  logout: () => {},
});

export default CurUserContext;
