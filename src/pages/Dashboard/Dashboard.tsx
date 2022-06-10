import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import DynamicChart from '../../components/Charts/DynamicChart';
import StructureChart from '../../components/Charts/StructureChart';
import { getCurrencyIcon, setDiagramData } from '../../helpers/helpers';
import { PageTitle } from '../../layouts/styles';
import { getIncomes } from '../../redux/incomes/asyncActions';
import { getExpenses } from '../../redux/expenses/asyncActions';
import { selectIncomes } from '../../redux/incomes/selectors';
import { selectExpenses } from '../../redux/expenses/selectors';
import { selectUser, selectUserId } from '../../redux/user/selectors';
import { AppDispatchType } from '../../redux/store';
import { ChartParams } from '../../redux/general';
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
  const user = useSelector(selectUser);
  const userId = useSelector(selectUserId);

  const curIcon = getCurrencyIcon(user!.currency);
  const incomesToRender = setDiagramData(incomes);
  const expensesToRender = setDiagramData(expenses);

  const totalIncome = incomes.reduce((acc: any, cur: any) => acc + cur.amount, 0);
  const totalExpenses = expenses.reduce((acc: any, cur: any) => acc + cur.amount, 0);
  
  useEffect(() => {
    dispatch(getIncomes(userId!));
    dispatch(getExpenses(userId!));
  }, [dispatch, user]);

  return (
    <>
      <PageTitle variant='inherit'>{t('pageHeading')}</PageTitle>
      <MainContainer container spacing={3} >
        <Section item>
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
        </Section>
        <Section item>
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
        </Section>  
      </MainContainer>
    </>
  );
};

export default Dashboard;