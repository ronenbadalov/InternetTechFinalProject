import "./App.scss";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Reset from "./pages/Reset";
import Nav from "./components/layout/Nav";
import { useContext, useEffect } from "react";
import { getUserFromSession } from "./helpers/userHelper";
import CurUserContext from "./store/curUser-context";
import EmailVerification from "./pages/EmailVerification";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from './config/firebase.js';

const App = () => {
  const curUserCtx = useContext(CurUserContext);
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    const userFromSession = getUserFromSession();
    curUserCtx.login(userFromSession);
    console.log(curUserCtx);
  }, []);

  return (
    <div className="App">
      <Nav />
      <Routes>
        {
        (user && !user.emailVerified) ? 
          (
          <>
          <Route path="/emailVerification" element={<EmailVerification />} />
          <Route path="*" element={<Navigate replace to="emailVerification" />} />
          </>
          ) : (
            (!user) ? 
            (
              <>
              <Route path="*" element={<Navigate replace to="/login" />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/reset" element={<Reset />} />
              </>
            ) : (
              <>
              <Route path="/" element={<Home />} />
              <Route path="*" element={<Navigate replace to="/" />} />
              </>
            )
          )
        }
      </Routes>
    </div>
  );
};

export default App;
