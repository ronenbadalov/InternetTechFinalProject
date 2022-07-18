import { TextField, Button } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../../helpers/userHelper";
import CurUserContext from "../../store/curUser-context";
import classes from "./UserOptions.module.scss";

const UserOptions = () => {
  const curUserCtx = useContext(CurUserContext);

  const [isPasswordError, setIsPasswordError] = useState(false);
  const [isSamePasswordError, setIsSamePasswordError] = useState(false);
  const [name, setName] = useState(null);
  const [isUsernameError, setIsUsernameError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordCopy, setPasswordCopy] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
  console.log(curUserCtx.user);
  setName(curUserCtx.user.name);

  },[]);

  const usernameValidityHandler = (e) => {
    if (e.target.value.length < 4) {
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

  const samePasswordValidityHandler = (e) => {
    if (e.target.value !== password) {
      setIsSamePasswordError(true);
    } else {
      setIsSamePasswordError(false);
    }
  };

  const submitFormHandler = async (e) => {
    e.preventDefault();
    if(password !== passwordCopy) {
      setIsPasswordError(true);
      return;
    }

    // if (name === curUserCtx.user.name) {
    //   if (!isPasswordError && !isSamePasswordError) {
    //     console.log("Same Name: " + name);
    //     console.log("Same Name: " + password);
    //     updateUser(name, password);
    //   }
    // } else {
      if(name !== curUserCtx.user.name || password.length > 0) {
        if (!isPasswordError && !isSamePasswordError && !isUsernameError) {
          console.log(name);
          console.log(password);
          updateUser(name, password);
          
        }
      }
    // }

        // await addUser({ email, password, name, type });
        // await getUser(email, password);
        // navigate("/emailVerification");
      
    }

  return (
    <div className="signupContainer">
      <form className="form" onSubmit={submitFormHandler} style={{width: "100%"}}>
        <h1 style={{ textAlign: "center", fontSize: "40px" }}>User Configurations</h1>

        <TextField
          error={isUsernameError}
          label="Full Name"
          variant="standard"
          sx={{ margin: "0.3rem 0" }}
          onBlur={usernameValidityHandler}
          value={curUserCtx.user.name}
          helperText={
            isUsernameError ? `Name must contain more than 4 characters` : ""
          }
          size="small"
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          error={isPasswordError}
          label="New Password"
          type="password"
          autoComplete="current-password"
          variant="standard"
          sx={{ margin: "0.5rem 0" }}
          onBlur={passwordValidityHandler}
          helperText={
            isPasswordError
              ? `Password must contain more than 6 characters`
              : ""
          }
          onChange={(e) => setPassword(e.target.value)}
          size="small"
        />
        <TextField
          error={isSamePasswordError}
          label="Password Validator"
          type="password"
          autoComplete="current-password"
          variant="standard"
          sx={{ margin: "0.5rem 0" }}
          onBlur={samePasswordValidityHandler}
          helperText={isSamePasswordError ? `Passwords don't match` : ""}
          size="small"
          onChange={(e) => setPasswordCopy(e.target.value)}
          required= {(password.length === 0) ? false : true}
        />
        <div className={classes["btnSection"]}>
        <Button
          sx={{ display: "inline-block", margin: "auto", width: "150px", marginTop: "30px" }}
          variant="contained"
          type="submit"
        >
          Save
        </Button>
        <Button
          sx={{ display: "inline-block",  margin: "auto", width: "150px", marginTop: "30px" }}
          variant="contained"
        >
          Close
        </Button>
        </div>
      </form>
    </div>
  );
};

export default UserOptions;
