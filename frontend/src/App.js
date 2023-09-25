import React from "react";
import { Route, Routes } from "react-router-dom";
import Signup from "./components/user/Signup";
import Login from "./components/user/Login";
import Expense from "./components/expense/Expense";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Expense />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}
