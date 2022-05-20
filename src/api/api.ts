import axios from 'axios';
import { IIncomeData } from '../redux/incomes/types';

const API = axios.create({ baseURL: 'http://localhost:5000' });



export const getIncomes = () => API.get('/incomes');
export const createIncomeItem = (income: any) => API.post('/incomes', income); 
export const updateIncomeItem = (id: any, updatedIncome: IIncomeData) => API.patch('/incomes', {id, updatedIncome});
export const deleteIncomeItem = (id: any) => API.delete('/incomes', { data: { id } })