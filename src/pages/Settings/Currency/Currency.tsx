import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { data } from '../../../helpers/data';
import { 
  CurrencyItem, 
  CurrencySelect, 
  Section, 
  SectionTitle 
} from './styles';

const Currency: React.FC = () => {
  const currencies = data.profile.currencies;
  const [currentCurrency, setCurrentCurrency] = useState('USD');

  const handleCurrencyChange = (e: any) => {
    setCurrentCurrency(e.target.value);
  };

  return (
    <Section>
      <SectionTitle variant='inherit'>Currency</SectionTitle>
      <CurrencySelect 
        value={currentCurrency} 
        onChange={handleCurrencyChange}
      >
        {
          currencies.map(item => (
            <CurrencyItem key={uuid()} value={item}>{item}</CurrencyItem>
          ))
        }
      </CurrencySelect>
    </Section>
  );
};

export default Currency;