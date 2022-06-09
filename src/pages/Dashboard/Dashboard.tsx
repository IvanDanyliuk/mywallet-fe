import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import DynamicChart from '../../components/Charts/DynamicChart';
import StructureChart from '../../components/Charts/StructureChart';
import { getCurrencyIcon, setDiagramData } from '../../helpers/helpers';
import { PageTitle } from '../../layouts/styles';
import { getExpenses } from '../../redux/expenses/asyncActions';
import { getIncomes } from '../../redux/incomes/asyncActions';
import { AppDispatchType } from '../../redux/store';
import { IUserState } from '../../redux/user/types';
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
  const incomes = useSelector((state: any) => state.incomes.incomes);
  const expenses = useSelector((state: any) => state.expenses.expenses);
  //@ts-ignore
  const user = useSelector((state: IUserState) => state.user.user);
  const curIcon = getCurrencyIcon(user.currency);
  const incomesToRender = setDiagramData(incomes);
  const expensesToRender = setDiagramData(expenses);

  const totalIncome = incomes.reduce((acc: any, cur: any) => acc + cur.amount, 0);
  const totalExpenses = expenses.reduce((acc: any, cur: any) => acc + cur.amount, 0);

  //@ts-ignore
  const userId = JSON.parse(localStorage.getItem('profile')).result._id;

  useEffect(() => {
    dispatch(getIncomes(userId));
    dispatch(getExpenses(userId));
  }, [dispatch, user]);

  return (
    <>
      <PageTitle variant='inherit'>{t('pageHeading')}</PageTitle>
      <MainContainer container spacing={3} >
        <Section item xs={12} md={6}>
          <SectionPaper>
            <SectionTitle variant='inherit'>{t('incomesSection')}</SectionTitle>
            <StructureChart 
              data={incomesToRender} 
              dataKey='amount' 
              nameKey='category' 
            />
            <DynamicChart 
              data={incomes} 
              dataKey='title' 
              nameKey='amount' 
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
        </Section>
        <Section item  xs={12} md={6}>
          <SectionPaper>
            <SectionTitle variant='inherit'>{t('expensesSection')}</SectionTitle>
            <StructureChart 
              data={expensesToRender} 
              dataKey='amount' 
              nameKey='category' 
            />
            <DynamicChart 
              data={expenses} 
              dataKey='title' 
              nameKey='amount' 
            />
            <Result>
              <Name variant='inherit'>{t('totalExpenses')}&nbsp;</Name>
              <Currency variant='inherit'>{curIcon}</Currency>
              <Amount variant='inherit'>{totalExpenses}</Amount>
            </Result>
          </SectionPaper>
        </Section>  
      </MainContainer>
    </>
  );
};

export default Dashboard;