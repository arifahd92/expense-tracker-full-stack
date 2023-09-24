import React from "react";
import { Route, Routes } from "react-router-dom";
import Signup from "./components/user/Signup";
import Login from "./components/user/Login";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/register" element={<Signup />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </>
  );
}
