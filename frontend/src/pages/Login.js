import React, { useContext, useEffect, useRef, useState } from "react";
import {Link} from 'react-router-dom';
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { getUser, getUserFromSession } from "../helpers/userHelper";
import CurUserContext from "../store/curUser-context";
const Login = () => {
  const curUserCtx = useContext(CurUserContext);

  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [isBtnClicked, setIsBtnClicked] = useState(false);
  const [isEmailError, setIsEmailError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const emailValidityHandler = (e) => {
    if (e.target.value.length < 6) {
      setIsEmailError(true);
    } else {
      setIsEmailError(false);
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
    setIsBtnClicked(true);
    const user = await getUser(email, password);
    if(user === undefined) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
      curUserCtx.login(user);
    }
  };
  return (
    <div className="loginContainer">
      <form className="form" onSubmit={submitFormHandler}>
      <h1 style={{textAlign: "center", fontSize: "40px"}}>Login</h1>
        <TextField
          // error={isUsernameError}
          label="Email"
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
        <div>
          <Link to="/reset">Forgot Password?</Link>
        </div>
        {
        (isBtnClicked && isLoggedIn === false) &&
         (<h6 style={{color: "red", marginTop:"30px", marginLeft: "50px"}}>Incorrect email or password!</h6>)
        }
        <Button
          sx={{ margin: "auto", width: "150px", marginTop:"30px" }}
          variant="contained"
          type="submit"
        >
          Login
        </Button>

        <div style={{marginTop: "20px"}}>
          Don't have an account? <Link to="/signup">Register</Link> now.
        </div>
      </form>
    </div>
  );
};

export default Login;
