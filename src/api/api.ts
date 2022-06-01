import axios from 'axios';
import { IIncomeData } from '../redux/incomes/types';
import { IExpenseData } from '../redux/expenses/types';
import { ICurrencyToUpdate, ILanguageToUpdate, IPasswordToUpdate, IUser } from '../redux/user/types';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
  if(localStorage.getItem('profile')) {
    //@ts-ignore
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage?.getItem('profile')).token}`
  }
  return req;
});

export const getIncomes = (userId: any) => API.get('/incomes', { params: { userId } });
export const createIncomeItem = (income: any) => API.post('/incomes', income); 
export const updateIncomeItem = (id: any, updatedIncome: IIncomeData) => API.patch('/incomes', {id, updatedIncome});
export const deleteIncomeItem = (id: any) => API.delete('/incomes', { data: { id } });

export const getExpenses = (userId: any) => API.get('/expenses', { params: { userId } });
export const createExpenseItem = (expense: any) => API.post('/expenses', expense); 
export const updateExpenseItem = (id: any, updatedExpense: IExpenseData) => API.patch('/expenses', {id, updatedExpense});
export const deleteExpenseItem = (id: any) => API.delete('/expenses', { data: { id } });

export const signIn = (userData: any) => API.post('/user/signin', userData);
export const signUp = (userData: any) => API.post('/user/signup', userData);
export const updateUser = (id: any, updatedUser: IUser) => API.patch('/user', { id, updatedUser });

export const updatePassword = (passwordData: IPasswordToUpdate) => API.patch('/user/update-password', passwordData);
export const setLanguage = (langData: ILanguageToUpdate) => API.patch('user/language', langData);
export const setCurrency = (curData: ICurrencyToUpdate) => API.patch('user/currency', curData);
