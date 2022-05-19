import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });



export const getIncomes = () => API.get('/incomes');
export const createIncomeItem = (income: any) => API.post('/incomes', income); 
export const editIncomeItem = (id: string) => {};
export const deleteIncomeItem = (id: any) => API.delete('/incomes', { data: { id } })