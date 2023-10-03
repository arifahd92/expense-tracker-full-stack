import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Signup from './components/user/Signup';
import Login from './components/user/Login';
import Expense from './components/expense/Expense';
import Redirect from './components/user/higherOrderComponents/Redirect';
import {useSelector} from 'react-redux';
import ForgotPassword from './components/user/ForgotPassword';
import ResetPassword from './components/user/ResetPassword';

export default function App () {
  const {darkFlag} = useSelector (state => state.user);
  console.log ({darkFlag: darkFlag});
  return (
    <div className={darkFlag && 'bg-black text-primary min-vh-100 min-vw-100 '}>
      <Routes>
        <Route path="/" element={<Redirect Component={Login} />} />
        <Route path="/expense" element={<Redirect Component={Expense} />} />
        <Route path="/register" element={<Redirect Component={Signup} />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route
          path="password/reset-password/:reqId"
          element={<ResetPassword />}
        />
      </Routes>
    </div>
  );
}
