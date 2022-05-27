import axios from 'axios';
import { IIncomeData } from '../redux/incomes/types';
import { IExpenseData } from '../redux/expenses/types';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
  if(localStorage.getItem('profile')) {
    //@ts-ignore
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage?.getItem('profile')).token}`
  }
  return req;
})

export const getIncomes = () => API.get('/incomes');
export const createIncomeItem = (income: any) => API.post('/incomes', income); 
export const updateIncomeItem = (id: any, updatedIncome: IIncomeData) => API.patch('/incomes', {id, updatedIncome});
export const deleteIncomeItem = (id: any) => API.delete('/incomes', { data: { id } });

export const getExpenses = () => API.get('/expenses');
export const createExpenseItem = (expense: any) => API.post('/expenses', expense); 
export const updateExpenseItem = (id: any, updatedExpense: IExpenseData) => API.patch('/expenses', {id, updatedExpense});
export const deleteExpenseItem = (id: any) => API.delete('/expenses', { data: { id } });

export const signIn = (userData: any) => API.post('/user/signin', userData);
export const signUp = (userData: any) => API.post('/user/signup', userData);