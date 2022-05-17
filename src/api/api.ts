import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });



export const getIncomes = () => API.get('/incomes');
export const createIncomeItem = (income: any) => API.post('/incomes', income); 