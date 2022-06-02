import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DynamicChart from '../../components/Charts/DynamicChart';
import StructureChart from '../../components/Charts/StructureChart';
import { data } from '../../helpers/data';
import { setDiagramData } from '../../helpers/helpers';
import { PageTitle } from '../../layouts/styles';
import { getExpenses } from '../../redux/expenses/asyncActions';
import { getIncomes } from '../../redux/incomes/asyncActions';
import { AppDispatchType } from '../../redux/store';
import { 
  MainContainer, 
  Result, 
  Section, 
  SectionPaper, 
  SectionTitle 
} from './styles';

const Dashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatchType>();
  const incomes = useSelector((state: any) => state.incomes.incomes);
  const expenses = useSelector((state: any) => state.expenses.expenses);

  const incomesToRender = setDiagramData(incomes);
  const expensesToRender = setDiagramData(expenses);

  const totalIncome = incomes.reduce((acc: any, cur: any) => acc + cur.amount, 0);
  const totalExpenses = expenses.reduce((acc: any, cur: any) => acc + cur.amount, 0);

  //@ts-ignore
  const userId = JSON.parse(localStorage.getItem('profile')).result._id;

  useEffect(() => {
    dispatch(getIncomes(userId));
    dispatch(getExpenses(userId))
  }, []);

  return (
    <>
      <PageTitle variant='inherit'>Dashboard</PageTitle>
      <MainContainer container spacing={3} >
        <Section item>
          <SectionPaper>
            <SectionTitle variant='inherit'>Incomes</SectionTitle>
            <StructureChart 
              data={incomesToRender} 
              dataKey='amount' 
              nameKey='category' 
            />
            <DynamicChart 
              data={data.incomes} 
              dataKey='categories' 
              nameKey='amount' 
            />
            <Result variant='inherit'>Total Income: ${totalIncome}</Result>
          </SectionPaper>
        </Section>
        <Section item>
          <SectionPaper>
            <SectionTitle variant='inherit'>Expenses</SectionTitle>
            <StructureChart 
              data={expensesToRender} 
              dataKey='amount' 
              nameKey='category' 
            />
            <DynamicChart 
              data={data.expenses} 
              dataKey='merchant' 
              nameKey='amount' 
            />
            <Result variant='inherit'>Total Expenses: ${totalExpenses}</Result>
          </SectionPaper>
        </Section>  
      </MainContainer>
    </>
  );
};

export default Dashboard;