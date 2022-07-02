import React, { useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { addUser } from "../helpers/userHelper";
const Signup = () => {
  const [isUsernameError, setIsUsernameError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [email, setEmail] = useState(null);
  const [name, setName] = useState(null);
  const [password, setPassword] = useState(null);
  const [type, setType] = useState(null);

  // add password confirmation
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

  const submitFormHandler = (e) => {
    e.preventDefault();
    addUser({ email, password, name, type });
    console.log(email);
    console.log(password);
    console.log(name);
    console.log(type);
  };

  return (
    <div>
      <form className="form" onSubmit={submitFormHandler}>
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
          // error={isUsernameError}
          label="Name"
          variant="outlined"
          sx={{ margin: "0.3rem 0" }}
          // onBlur={usernameValidityHandler}
          // helperText={
          //   isUsernameError
          //     ? `Username must contain more than 6 characters`
          //     : ""
          // }
          size="small"
          onChange={(e) => setName(e.target.value)}
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
        <FormControl>
          <InputLabel id="typeSelectLabel">Type</InputLabel>
          <Select
            labelId="typeSelectLabel"
            id="typeSelect"
            value={type}
            label="Type"
            size="small"
            onChange={(e) => setType(e.target.value)}
          >
            <MenuItem value={0}>Guest</MenuItem>
            <MenuItem value={1}>Buyer/Seller</MenuItem>
          </Select>
        </FormControl>
        <Button
          sx={{ margin: "auto", width: "150px" }}
          variant="contained"
          type="submit"
        >
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default Signup;
