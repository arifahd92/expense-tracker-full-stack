import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Signup from './components/user/Signup';
import Login from './components/user/Login';
import Expense from './components/expense/Expense';
import Redirect from './components/user/higherOrderComponents/Redirect';
import {useSelector} from 'react-redux';

export default function App () {
  const {darkFlag} = useSelector (state => state.user);
  console.log ({darkFlag: darkFlag});
  return (
    <div className={darkFlag && 'bg-black text-primary min-vh-100 min-vw-100 '}>
      <Routes>
        <Route path="/" element={<Redirect Component={Login} />} />
        <Route path="/expense" element={<Redirect Component={Expense} />} />
        <Route path="/register" element={<Redirect Component={Signup} />} />
      </Routes>
    </div>
  );
}
