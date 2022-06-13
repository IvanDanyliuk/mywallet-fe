import { IExpense } from './../redux/expenses/types';
import { IIncome } from '../redux/incomes/types';
import { useTranslation } from 'react-i18next';

export const getPageTitleFromUrl = (urlData: string): string => {
  if(urlData === '/') return 'Dashboard';
  const title = urlData.split('/')[1];
  return title[0].toUpperCase() + title.slice(1);
};

export const generateColor = (category: any) => {
  switch(category) {
    case 'Regular':
      return '#ff6361';
    case 'Non-Regular':
      return '#ffa600';
    case 'All':
      return '#003f5c';
    case 'Uncategorized':
      return '#2f4b7c';
    case 'Benefits':
      return '#665191';
    case 'Car':
      return '#a05195';
    case 'Equipment':
      return '#d45087';
    case 'Fees':
      return '#f95d6a';
    case 'Home Office':
      return '#ff7c43';
    case 'Insurance':
      return '#ffa600';
    case 'Interest':
      return '#1984c5';
    case 'Labor':
      return '#22a7f0';
    case 'Maintenance':
      return '#63bff0';
    case 'Materials':
      return '#a7d5ed';
    case 'Meal and Entertainment':
      return '#e1a692';
    case 'Office Supllies':
      return '#de6e56';
    case 'Other':
      return '#e14b31';
    case 'Professional Services':
      return '#c23728';
    case 'Rent':
      return '#ffb400';
    case 'Taxes':
      return '#363445';
    case 'Travel':
      return '#9080ff';
    case 'Utilities':
      return '#5e569b';
    default:
      return '#e4bcad';
  }
};

export const setColor = () => {
  const color = Math.floor(Math.random() * 16777215).toString(16);
  return `#${color}`;
};

export const setDiagramData = (data: IIncome[] | IExpense[]) => {
  const dataKeys = data.map((item: any) => item.category);
  const uniqueKeys = Array.from(new Set(dataKeys));
  return uniqueKeys.map(key => (
    { 
      category: key, 
      amount: data
                .filter(item => item.category === key)
                .reduce((acc, cur: any) => acc + cur.amount, 0), 
      badgeColor: generateColor(key) 
    }
  ));
};

export const setGreeting = (lang: string) => {
  const currentTime = new Date().getHours();
  switch(true) {
    case currentTime >= 23 && currentTime <= 24 || currentTime >= 0 && currentTime < 5:
      return lang === 'ua' ? 'Доброї ночі' : 'Good night';
    case currentTime >= 5 && currentTime < 11:
      return lang === 'ua' ? 'Доброго ранку' : 'Good morning';
    case currentTime >= 11 && currentTime < 17:
      return lang === 'ua' ? 'Доброго дня' : 'Good afternoon';
    case currentTime >= 17 && currentTime < 23:
      return lang === 'ua' ? 'Доброго вечора' : 'Good evening';
    default: 
      return lang === 'ua' ? 'Привіт' : 'Hello';
  }
};

export const getCurrencyIcon = (currency: string) => {
  switch(currency) {
    case 'usd':
      return '$';
    case 'eur':
      return '€';
    case 'gbp':
      return '£';
    case 'pln':
      return 'zł';
    case 'uah':
      return '₴';
    default: 
      return '';
  }
};

export const getDifferentCurrency = (currenctCurrency: string, currencyList: string[]) => {
  return currenctCurrency !== 'usd' ? 
    'usd' : 
    currencyList[currencyList.indexOf(currenctCurrency!) + 1];
};