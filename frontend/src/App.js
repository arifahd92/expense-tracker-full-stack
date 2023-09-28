import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Signup from './components/user/Signup';
import Login from './components/user/Login';
import Expense from './components/expense/Expense';
import Redirect from './components/user/higherOrderComponents/Redirect';

export default function App () {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Redirect Component={Login} />} />
        <Route path="/expense" element={<Redirect Component={Expense} />} />
        <Route path="/register" element={<Redirect Component={Signup} />} />
      </Routes>
    </div>
  );
}
