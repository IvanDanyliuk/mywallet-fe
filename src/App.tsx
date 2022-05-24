import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './layouts/Layout';
import Authentication from './pages/Authentication/Authentication';
import Dashboard from './pages/Dashboard/Dashboard';
import Expenses from './pages/Expenses/Expenses';
import Incomes from './pages/Incomes/Incomes';
import Reports from './pages/Reports/Reports';
import Settings from './pages/Settings/Settings';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/incomes' element={<Incomes />} />
        <Route path='/expenses' element={<Expenses />} />
        <Route path='/reports' element={<Reports />} />
        <Route path='/settings' element={<Settings />} />
        <Route path='/auth' element={<Authentication />} />
      </Routes>
    </Layout>
  );
}

export default App;
