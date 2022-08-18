import Board from "./components/Board";
// import styled from 'styled-components';
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login";
import { useState } from "react";
import Register from "./components/Register";

const App = () => {

  const getToken = () => {
    const tokenString = localStorage.getItem("token");
    const userToken = JSON.parse(tokenString);
    return userToken;
  };

  const [token, setToken] = useState(() => getToken());

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={
          !token ? <Navigate replace to="/login" /> : <Board token={token} />
        } />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register setToken={setToken} />} />
      </Routes>
    </div>
  );
};

export default App;