import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../config/firebase.js";
import { sendPasswordResetEmail } from "firebase/auth";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

function Reset() {
  const [isSent, setIsSent] = useState(false);
  const [isEmailError, setIsEmailError] = useState(true);
  const [email, setEmail] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/home");
  }, [user, loading]);

  const emailValidityHandler = (e) => {
    const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const emailValue = e.target.value;
    if (emailValue.match(emailFormat)) {
      setIsEmailError(false);
    } else {
      setIsEmailError(true);
    }
  };

  const submitFormHandler = () => {
    if(!isEmailError) {
        sendPasswordResetEmail(auth, email);
        setIsSent(true);
      }
  };

  return (
    <div className="loginContainer">
      <div className="form">
        <h1 style={{ textAlign: "center", fontSize: "40px" }}>
          Reset Password
        </h1>
        <TextField
          error={isEmailError}
          label="Email"
          variant="outlined"
          sx={{ margin: "0.3rem 0" }}
          onBlur={emailValidityHandler}
          helperText={
            isEmailError
              ? `Not A Valid Email`
              : ""
          }
          size="small"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {
        (isSent) &&
         (<h6 style={{color: "green", marginTop:"30px", marginLeft: "40px"}}>Password Reset has been sent!</h6>)
        }
        <Button
          sx={{ margin: "auto", width: "fit-content", marginTop: "30px" }}
          variant="contained"
          type="submit"
          onClick={() => submitFormHandler()}
        >
          Send Password Reset Email
        </Button>
        <div style={{marginTop: "20px"}}>
          Don't have an account? <Link to="/register">Register</Link> now.
        </div>
      </div>
    </div>
  );
}
export default Reset;
