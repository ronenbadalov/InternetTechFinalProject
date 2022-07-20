import "./App.scss";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Reset from "./pages/Reset";
import Nav from "./components/layout/Nav";
import { useContext, useEffect, useState } from "react";
import { getUserFromSession, userLogOut } from "./helpers/userHelper";
import CurUserContext from "./store/curUser-context";
import EmailVerification from "./pages/EmailVerification";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./config/firebase.js";
import Loader from "./components/Loader/Loader";

const App = () => {
  const curUserCtx = useContext(CurUserContext);
  const [user, loading, error] = useAuthState(auth);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setUser();
  }, []);

  const setUser = async () => {
    setIsLoading(true);
    const userFromSession = await getUserFromSession();
    if (!userFromSession) {
      userLogOut();
      auth.signOut();
    }
    curUserCtx.login(userFromSession);
    setIsLoading(false);
  };
  return (
    <div className="App">
      {isLoading && <Loader />}
      {!isLoading && (
        <>
          <Nav />
          <Routes>
            {user && !user.emailVerified ? (
              <>
                <Route
                  path="/emailVerification"
                  element={<EmailVerification />}
                />
                <Route
                  path="*"
                  element={<Navigate replace to="emailVerification" />}
                />
              </>
            ) : !user || !curUserCtx.user ? (
              <>
                <Route path="*" element={<Navigate replace to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/reset" element={<Reset />} />
              </>
            ) : (
              <>
                <Route path="/" element={<Home setUser={setUser} />} />
                <Route path="*" element={<Navigate replace to="/" />} />
              </>
            )}
          </Routes>
        </>
      )}
    </div>
  );
};

export default App;
