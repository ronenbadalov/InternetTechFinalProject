import "./App.scss";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Nav from "./components/layout/Nav";
const App = () => {
  return (
    <div className="App">
      <Nav />
      <Routes>
        {/* <Route path="/" element={<Navigate replace to="/welcome" />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Navigate replace to="/" />} />
        {/* <Route path="/products/:productId" element={<ProductDetail />} /> */}
      </Routes>
    </div>
  );
};

export default App;
