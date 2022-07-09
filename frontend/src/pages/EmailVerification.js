import React, { useState } from "react";
import Lottie from "lottie-react";
import { Button} from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import emailLottie from "../lottie/emailVerification.json";
import classes from "../components/Loader/Loader.module.scss";
import { sendEmailVerification } from "firebase/auth";
import { auth } from "../config/firebase.js";

const EmailVerification = () => {
    const [user, loading, error] = useAuthState(auth);
    const [isSent, setIsSent] = useState(false);

    const sendEmail = () => {
        sendEmailVerification(user);
        setIsSent(true);
    }

  return (
    <div className={classes['container']}>
      {<Lottie
        animationData={emailLottie}
        loop={true}
        style={{ width: "300px" }}
      />}
      <h3>Please Verify your email address before proceed</h3>
      <Button
          sx={{ margin: "auto", width: "200px", marginTop: "30px" }}
          variant="contained"
          type="submit"
          onClick={() => {sendEmail()}}
        >
          Resend Verification
        </Button>
        {isSent && (<h3 style={{color: "green"}}>Email verification has been sent! Check your email.</h3>) }
    </div>
  );

};

export default EmailVerification;
