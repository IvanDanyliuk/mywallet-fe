import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { v4 as uuid } from 'uuid';
import { data } from '../../../helpers/data';
import { AppDispatchType } from '../../../redux/store';
import { setCurrency } from '../../../redux/user/asyncAction';
import { selectUser } from '../../../redux/user/selectors';
import { 
  CurrencyItem, 
  CurrencySelect, 
  Section, 
  SectionTitle 
} from './styles';


const Currency: React.FC = () => {
  const { t } = useTranslation(['settings']);
  const dispatch = useDispatch<AppDispatchType>();
  const currencies = data.profile.currencies;
  const user = useSelector(selectUser);
  const token = JSON.parse(localStorage.getItem('profile') || '').token;

  const [currentCurrency, setCurrentCurrency] = useState(user!.currency);

  const handleCurrencyChange = (e: any) => {
    e.preventDefault();
    setCurrentCurrency(e.target.value);
  };

  useEffect(() => {
    if(user!.currency !== currentCurrency) {
      dispatch(setCurrency({
        id: user!._id,
        currency: currentCurrency,
      }));
      localStorage.setItem(
        'profile', 
        JSON.stringify({ 
          token: token, 
          result: { ...user, currency: currentCurrency } 
        })
      );
    }
  }, [currentCurrency]);

  return (
    <Section>
      <SectionTitle variant='inherit'>{t('currencySectionTitle')}</SectionTitle>
      <CurrencySelect 
        value={currentCurrency} 
        onChange={handleCurrencyChange}
      >
        {
          currencies.map(item => (
            <CurrencyItem 
              key={uuid()} 
              value={item.value}
            >
              {item.label}
            </CurrencyItem>
          ))
        }
      </CurrencySelect>
    </Section>
  );
};

export default Currency;