import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './layouts/Layout';
import Authentication from './pages/Authentication/Authentication';
import Dashboard from './pages/Dashboard/Dashboard';
import Expenses from './pages/Expenses/Expenses';
import Incomes from './pages/Incomes/Incomes';
import Reports from './pages/Reports/Reports';
import Settings from './pages/Settings/Settings';

function App() {
  //@ts-ignore
  const user = useSelector((state: IUserState) => state.user.user);

  return (
    <Layout>
      <Routes>
        <Route path='/' element={user ? <Dashboard /> : <Navigate to='/auth' />} />
        <Route path='/incomes' element={user ? <Incomes /> : <Navigate to='/auth' />} />
        <Route path='/expenses' element={user ? <Expenses /> : <Navigate to='/auth' />} />
        <Route path='/reports' element={user ? <Reports /> : <Navigate to='/auth' />} />
        <Route path='/settings' element={user ? <Settings /> : <Navigate to='/auth' />} />
        <Route path='/auth' element={<Authentication />} />
      </Routes>
    </Layout>
  );
};

export default App;
