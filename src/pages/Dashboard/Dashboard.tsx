import React from 'react';
import DynamicChart from '../../components/Charts/DynamicChart';
import StructureChart from '../../components/Charts/StructureChart';
import { data } from '../../helpers/data';
import { MainContainer, Result, Section, SectionTitle } from './styles';

const Dashboard: React.FC = () => {

  return (
    <MainContainer>
      <Section>
        <SectionTitle variant='inherit'>Incomes</SectionTitle>
        <StructureChart data={data.incomes} dataKey='amount' nameKey='category' />
        <DynamicChart data={data.incomes} dataKey='categories' nameKey='amount' />
        <Result variant='inherit'>Total Income: ${data.totalIncome}</Result>
      </Section>
      <Section>
        <SectionTitle variant='inherit'>Expenses</SectionTitle>
        <StructureChart data={data.expenses} dataKey='amount' nameKey='merchant' />
        <DynamicChart data={data.expenses} dataKey='merchant' nameKey='amount' />
        <Result variant='inherit'>Total Expenses: ${data.totalExpenses}</Result>
      </Section>  
    </MainContainer>
  );
};

export default Dashboard;