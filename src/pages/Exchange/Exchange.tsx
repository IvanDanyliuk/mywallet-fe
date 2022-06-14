import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { currencies } from '../../constants/constants';
import { getDifferentCurrency } from '../../helpers/helpers';
import { getExchangeRate } from '../../redux/exchange/asyncActions';
import { reset } from '../../redux/exchange/reducers';
import { selectExchangeData } from '../../redux/exchange/selectors';
import { AppDispatchType } from '../../redux/store';
import { selectCurrency } from '../../redux/user/selectors';
import { 
  ButtonWrapper, 
  ContentContainer, 
  CurrencyItem, 
  CurrencySelect, 
  Details, 
  DetailsSection, 
  ExchangeForm, 
  FormContainer, 
  FormItem, 
  Input, 
  PassedAmount, 
  Rate, 
  ResetButton, 
  ResultAmount, 
  ResultData, 
  SubmitButton, 
  Title 
} from './styles';


const Exchange: React.FC = () => {
  const { t } = useTranslation(['exchange']);
  const dispatch = useDispatch<AppDispatchType>();

  const defaultFromCurrency = useSelector(selectCurrency);
  const result = useSelector(selectExchangeData);

  const modifiedCurrencies = currencies.map(currency => currency.value);
  const defaultToCurrency = getDifferentCurrency(defaultFromCurrency!, modifiedCurrencies);

  const [exchangeData, setExchangeData] = useState({
    amount: 0,
    from: defaultFromCurrency!,
    to: defaultToCurrency
  });

  const handleExchangeData = (e: any) => {
    setExchangeData({
      ...exchangeData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if(exchangeData.amount !== 0 && exchangeData.from !== exchangeData.to) {
      dispatch(getExchangeRate(exchangeData));
    }
  };

  const handleReset = () => {
    dispatch(reset());
    setExchangeData({
      amount: 0,
      from: defaultFromCurrency!,
      to: defaultToCurrency 
    });
  };

  useEffect(() => {
    return handleReset();
  }, []);

  return (
    <>
      <Title variant='inherit'>{t('exchangeTitle')}</Title>
      <ContentContainer>
        <ExchangeForm onSubmit={handleSubmit}>
          <FormContainer container spacing={2}>
            <FormItem item md={4} xs={12}>
              <Input 
                name='amount' 
                label={t('labelAmount')} 
                value={exchangeData.amount} 
                onChange={handleExchangeData} 
              />
            </FormItem>
            <FormItem item md={3} xs={12}>
              <CurrencySelect 
                name='from' 
                value={exchangeData.from} 
                onChange={handleExchangeData}
              >
                {
                  currencies.map(item => (
                    <CurrencyItem key={uuid()} value={item.value}>{item.label}</CurrencyItem>
                  ))
                }
              </CurrencySelect>
            </FormItem>
            <FormItem item md={3} xs={12}>
              <CurrencySelect 
                name='to' 
                value={exchangeData.to} 
                onChange={handleExchangeData}
              >
                {
                  currencies.map(item => (
                    <CurrencyItem key={uuid()} value={item.value}>{item.label}</CurrencyItem>
                  ))
                }
              </CurrencySelect>
            </FormItem>
            <FormItem item md={2} xs={12}>
              <SubmitButton variant='contained' type='submit'>{t('convertButton')}</SubmitButton>
            </FormItem>
          </FormContainer>
        </ExchangeForm>
        <Details container spacing={2}>
          <DetailsSection item md={10} xs={12}>
            <ResultData>
              {
                result && (
                  <>
                    <PassedAmount variant='inherit'>
                      {`${exchangeData.from.toUpperCase()}${exchangeData.amount} =`}
                    </PassedAmount>
                    <ResultAmount variant='inherit'>
                      {`${exchangeData.to.toUpperCase()} ${result.convertedAmount}`}
                    </ResultAmount>
                    <Rate variant='inherit'>
                      {`1${exchangeData.from.toUpperCase()} = ${result.resultRate}${exchangeData.to.toUpperCase()}`}
                    </Rate>
                    <Rate variant='inherit'>
                      {`1${exchangeData.to.toUpperCase()} = ${result.reversedRate}${exchangeData.from.toUpperCase()}`}
                    </Rate>
                  </>
                )
              }
            </ResultData>
          </DetailsSection>
          <DetailsSection item md={2} xs={12}>
            <ButtonWrapper>
              <ResetButton 
                variant='contained' 
                color='secondary' 
                onClick={handleReset}
              >
                {t('resetButton')}
              </ResetButton>
            </ButtonWrapper>
          </DetailsSection>
        </Details>
      </ContentContainer>
    </>
  );
};

export default Exchange;