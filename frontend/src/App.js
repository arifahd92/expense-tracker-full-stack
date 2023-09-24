import React from "react";
import { Route, Routes } from "react-router-dom";
import Signup from "./components/user/Signup";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Signup />} />
      </Routes>
    </>
  );
}
