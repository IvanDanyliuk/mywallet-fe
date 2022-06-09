import React, { Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './layouts/Layout';
import Authentication from './pages/Authentication/Authentication';
import Dashboard from './pages/Dashboard/Dashboard';
import Expenses from './pages/Expenses/Expenses';
import Incomes from './pages/Incomes/Incomes';
import ReportDetails from './pages/Reports/ReportDetails/ReportDetails';
import Reports from './pages/Reports/Reports';
import Settings from './pages/Settings/Settings';
import i18n from './services/langConfig';

function App() {
  //@ts-ignore
  const user = useSelector((state: IUserState) => state.user.user);

  useEffect(() => {
    i18n.changeLanguage(localStorage.getItem('lang') || 'en');
  }, []);

  return (
    <Suspense fallback={null}>
      <Layout>
        <Routes>
          <Route path='/' element={user ? <Dashboard /> : <Navigate to='/auth' />} />
          <Route path='/incomes' element={user ? <Incomes /> : <Navigate to='/auth' />} />
          <Route path='/expenses' element={user ? <Expenses /> : <Navigate to='/auth' />} />
          <Route path='/reports' element={user ? <Reports /> : <Navigate to='/auth' />} />
          <Route path='/reports/:id' element={user ? <ReportDetails /> : <Navigate to='/auth' />} />
          <Route path='/settings' element={user ? <Settings /> : <Navigate to='/auth' />} />
          <Route path='/auth' element={<Authentication />} />
        </Routes>
      </Layout>
    </Suspense>
  );
};

export default App;
