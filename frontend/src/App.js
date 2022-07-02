import "./App.scss";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Nav from "./components/layout/Nav";
import { useContext, useEffect } from "react";
import { getUserFromSession } from "./helpers/userHelper";
import CurUserContext from "./store/curUser-context";
const App = () => {
  const curUserCtx = useContext(CurUserContext);
  useEffect(() => {
    const userFromSession = getUserFromSession();
    console.log(userFromSession);
    curUserCtx.login(userFromSession);
  }, []);

  console.log(curUserCtx);
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </div>
  );
};

export default App;
