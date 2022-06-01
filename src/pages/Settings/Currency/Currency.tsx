import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { data } from '../../../helpers/data';
import { AppDispatchType } from '../../../redux/store';
import { setCurrency } from '../../../redux/user/asyncAction';
import { 
  CurrencyItem, 
  CurrencySelect, 
  Section, 
  SectionTitle 
} from './styles';

const Currency: React.FC = () => {
  const dispatch = useDispatch<AppDispatchType>();
  const currencies = data.profile.currencies;
  const user = JSON.parse(localStorage.getItem('profile') || '');
  const [currentCurrency, setCurrentCurrency] = useState(user.result.currency);

  const handleCurrencyChange = (e: any) => {
    e.preventDefault();
    setCurrentCurrency(e.target.value);
  };

  useEffect(() => {
    if(user.result.currency !== currentCurrency) {
      dispatch(setCurrency({
        id: user.result._id,
        currency: currentCurrency,
      }));
      localStorage.setItem(
        'profile', 
        JSON.stringify({ 
          token: user.token, 
          result: { ...user.result, currency: currentCurrency } 
        })
      );
    }
  }, [currentCurrency]);

  return (
    <Section>
      <SectionTitle variant='inherit'>Currency</SectionTitle>
      <CurrencySelect 
        value={currentCurrency} 
        onChange={handleCurrencyChange}
      >
        {
          currencies.map(item => (
            <CurrencyItem key={uuid()} value={item.value}>{item.label}</CurrencyItem>
          ))
        }
      </CurrencySelect>
    </Section>
  );
};

export default Currency;