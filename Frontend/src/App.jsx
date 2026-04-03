import React from "react";
import SignupLogin from "./components/SignupLogin";
import Home from "./pages/Home";
import {Navigate, Route, Routes } from "react-router-dom";
import { useState } from "react";
import RefreshHandler from "./RefreshHandler";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const PrivateRoute = ({element}) => {
    return isAuthenticated ? element: <Navigate to="/"/>
  }

  return <div>
    <RefreshHandler setIsAuthenticated={setIsAuthenticated}/>
    <Routes>
      <Route path="/" element={<SignupLogin/>} ></Route>
      <Route path="/home" element={<PrivateRoute element={<Home/>}/>} ></Route>
    </Routes>
  </div>
};

export default App;