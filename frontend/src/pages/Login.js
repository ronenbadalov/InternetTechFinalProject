import React, { useContext, useEffect, useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { getUser, getUserFromSession } from "../helpers/userHelper";
import CurUserContext from "../store/curUser-context";
const Login = () => {
  const curUserCtx = useContext(CurUserContext);

  const [isUsernameError, setIsUsernameError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const usernameValidityHandler = (e) => {
    if (e.target.value.length < 6) {
      setIsUsernameError(true);
    } else {
      setIsUsernameError(false);
    }
  };
  const passwordValidityHandler = (e) => {
    if (e.target.value.length < 6) {
      setIsPasswordError(true);
    } else {
      setIsPasswordError(false);
    }
  };

  const submitFormHandler = async (e) => {
    e.preventDefault();
    const user = await getUser(email, password);
    curUserCtx.login(user);
  };
  return (
    <div>
      <form className="form" onSubmit={submitFormHandler}>
        <TextField
          // error={isUsernameError}
          label="Username"
          variant="outlined"
          sx={{ margin: "0.3rem 0" }}
          // onBlur={usernameValidityHandler}
          // helperText={
          //   isUsernameError
          //     ? `Username must contain more than 6 characters`
          //     : ""
          // }
          size="small"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          error={isPasswordError}
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="outlined"
          sx={{ margin: "0.5rem 0" }}
          onBlur={passwordValidityHandler}
          helperText={
            isPasswordError
              ? `Password must contain more than 6 characters`
              : ""
          }
          onChange={(e) => setPassword(e.target.value)}
          size="small"
          required
        />
        <Button
          sx={{ margin: "auto", width: "150px" }}
          variant="contained"
          type="submit"
        >
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
