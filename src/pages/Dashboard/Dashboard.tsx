import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DynamicChart from '../../components/Charts/DynamicChart';
import StructureChart from '../../components/Charts/StructureChart';
import { data } from '../../helpers/data';
import { PageTitle } from '../../layouts/styles';
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

  //@ts-ignore
  const userId = JSON.parse(localStorage.getItem('profile')).result._id;

  useEffect(() => {
    dispatch(getIncomes(userId));
  }, []);

  return (
    <>
      <PageTitle variant='inherit'>Dashboard</PageTitle>
      <MainContainer container>
        <Section item>
          <SectionPaper>
            <SectionTitle variant='inherit'>Incomes</SectionTitle>
            <StructureChart 
              data={incomes} 
              dataKey='amount' 
              nameKey='category' 
            />
            <DynamicChart 
              data={data.incomes} 
              dataKey='categories' 
              nameKey='amount' 
            />
            <Result variant='inherit'>Total Income: ${data.totalIncome}</Result>
          </SectionPaper>
        </Section>
        <Section>
          <SectionPaper>
            <SectionTitle variant='inherit'>Expenses</SectionTitle>
            <StructureChart 
              data={data.expenses} 
              dataKey='amount' 
              nameKey='merchant' 
            />
            <DynamicChart 
              data={data.expenses} 
              dataKey='merchant' 
              nameKey='amount' 
            />
            <Result variant='inherit'>Total Expenses: ${data.totalExpenses}</Result>
          </SectionPaper>
        </Section>  
      </MainContainer>
    </>
  );
};

export default Dashboard;