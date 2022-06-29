import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import DynamicChart from '../../components/Charts/DynamicChart';
import StructureChart from '../../components/Charts/StructureChart';
import TextMessage from '../../components/TextMessage/TextMessage';
import { getCurrencyIcon, setDiagramData } from '../../helpers/helpers';
import { PageTitle } from '../../layouts/styles';
import { getIncomes } from '../../redux/incomes/asyncActions';
import { getExpenses } from '../../redux/expenses/asyncActions';
import { selectIncomes } from '../../redux/incomes/selectors';
import { selectExpenses } from '../../redux/expenses/selectors';
import { selectCurrency, selectUserId } from '../../redux/user/selectors';
import { AppDispatchType } from '../../redux/store';
import { ChartParams, DataType } from '../../redux/general';
import { 
  Amount,
  Currency,
  MainContainer, 
  Name, 
  Result, 
  Section, 
  SectionPaper, 
  SectionTitle 
} from './styles';


const Dashboard: React.FC = () => {
  const { t } = useTranslation(['dashboard']);
  const dispatch = useDispatch<AppDispatchType>();

  const incomes = useSelector(selectIncomes);
  const expenses = useSelector(selectExpenses);
  const currency = useSelector(selectCurrency);
  const userId = useSelector(selectUserId);

  const curIcon = getCurrencyIcon(currency!);
  const incomesToRender = setDiagramData(incomes);
  const expensesToRender = setDiagramData(expenses);

  const totalIncome = incomes.reduce((acc: any, cur: any) => acc + cur.amount, 0);
  const totalExpenses = expenses.reduce((acc: any, cur: any) => acc + cur.amount, 0);
  
  useEffect(() => {
    dispatch(getIncomes(userId!));
    dispatch(getExpenses(userId!));
  }, [dispatch, currency]);

  return (
    <>
      <PageTitle variant='inherit'>{t('pageHeading')}</PageTitle>
      <MainContainer container spacing={3} >
        <Section item xs={12} md={6}>
          {
            incomes.length > 0 ? (
              <SectionPaper>
                <SectionTitle variant='inherit'>{t('incomesSection')}</SectionTitle>
                <StructureChart 
                  data={incomesToRender} 
                  dataKey={ChartParams.Amount} 
                  nameKey={ChartParams.Category} 
                />
                <DynamicChart 
                  data={incomes} 
                  dataKey={ChartParams.Title} 
                  nameKey={ChartParams.Amount} 
                />
                <Result>
                  <Name variant='inherit'>
                    {t('totalIncome')}&nbsp;
                  </Name>
                  <Currency variant='inherit'>
                    {curIcon}
                  </Currency>
                  <Amount variant='inherit'>
                    {totalIncome}
                  </Amount>
                </Result>
              </SectionPaper>
            ) : (
              <TextMessage type={DataType.Incomes} />
            )
          }
        </Section>
        <Section item  xs={12} md={6}>
          {
            incomes.length > 0 ? (
              <SectionPaper>
                <SectionTitle variant='inherit'>{t('expensesSection')}</SectionTitle>
                <StructureChart 
                  data={expensesToRender} 
                  dataKey={ChartParams.Amount} 
                  nameKey={ChartParams.Category} 
                />
                <DynamicChart 
                  data={expenses} 
                  dataKey={ChartParams.Title} 
                  nameKey={ChartParams.Amount} 
                />
                <Result>
                  <Name variant='inherit'>{t('totalExpenses')}&nbsp;</Name>
                  <Currency variant='inherit'>{curIcon}</Currency>
                  <Amount variant='inherit'>{totalExpenses}</Amount>
                </Result>
              </SectionPaper>
            ) : (
              <TextMessage type={DataType.Expenses} />
            )
          }
        </Section>  
      </MainContainer>
    </>
  );
};

export default Dashboard;