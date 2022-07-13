import React, { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { addUser, getUser, checkIfEmailExists } from "../helpers/userHelper";

const Signup = () => {
  const [isEmailError, setIsEmailError] = useState(false);
  const [isEmailExists, setIsEmailExists] = useState(false);
  const [isUsernameError, setIsUsernameError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [isSamePasswordError, setIsSamePasswordError] = useState(false);
  const [email, setEmail] = useState(null);
  const [name, setName] = useState(null);
  const [password, setPassword] = useState(null);
  const [type, setType] = useState(0);
  const navigate = useNavigate();

  const emailValidityHandler = (e) => {
    const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const emailValue = e.target.value;
    if (emailValue.match(emailFormat)) {
      setIsEmailError(false);
    } else {
      setIsEmailError(true);
    }
  };

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
    if (
      !isEmailError &&
      !isPasswordError &&
      !isSamePasswordError &&
      !isUsernameError
    ) {
      const isExists = await checkIfEmailExists(email);
      if (isExists) {
        setIsEmailExists(true);
      } else {
        setIsEmailExists(false);
        await addUser({ email, password, name, type });
        await getUser(email, password);
        navigate("/emailVerification");
      }
    }
  };

  return (
    <div className="signupContainer">
      <form className="form" onSubmit={submitFormHandler}>
        <h1 style={{ textAlign: "center", fontSize: "40px" }}>Register</h1>

        <TextField
          error={isEmailError}
          label="Email"
          variant="standard"
          sx={{ margin: "0.3rem 0" }}
          onBlur={emailValidityHandler}
          helperText={isEmailError ? `Not a Valid Email!` : ""}
          size="small"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          error={isUsernameError}
          label="Name"
          variant="standard"
          sx={{ margin: "0.3rem 0" }}
          onBlur={usernameValidityHandler}
          helperText={
            isUsernameError ? `Name must contain more than 4 characters` : ""
          }
          size="small"
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          error={isPasswordError}
          label="Password"
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
          required
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
          required
        />
        <FormControl sx={{ marginTop: "1rem" }}>
          <InputLabel id="typeSelectLabel">Type</InputLabel>
          <Select
            labelId="typeSelectLabel"
            id="typeSelect"
            value={type}
            label="Type"
            size="small"
            onChange={(e) => setType(e.target.value)}
            variant="standard"
          >
            <MenuItem value={0}>Guest</MenuItem>
            <MenuItem value={1}>Buyer/Seller</MenuItem>
          </Select>
        </FormControl>
        {isEmailExists && (
          <h6 style={{ color: "red", marginTop: "30px", marginLeft: "80px" }}>
            Email already Exists
          </h6>
        )}
        <Button
          sx={{ margin: "auto", width: "150px", marginTop: "30px" }}
          variant="contained"
          type="submit"
        >
          Sign Up
        </Button>

        <div style={{ marginTop: "20px" }}>
          Already have an account? <Link to="/login">Login</Link> now.
        </div>
      </form>
    </div>
  );
};

export default Signup;
