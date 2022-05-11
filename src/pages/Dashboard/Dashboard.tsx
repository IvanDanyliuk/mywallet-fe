import React from 'react';
import DynamicChart from '../../components/Charts/DynamicChart';
import StructureChart from '../../components/Charts/StructureChart';
import { data } from '../../helpers/data';
import { ChartGroup, Dynamic, MainContainer, Result, ResultData } from './styles';

const Dashboard: React.FC = () => {

  return (
    <MainContainer>
      <ChartGroup>
        <StructureChart data={data.incomes} dataKey='amount' nameKey='category' />
        <StructureChart data={data.expenses} dataKey='amount' nameKey='merchant' />
      </ChartGroup>
      <Dynamic>
        <DynamicChart data={data.incomes} dataKey='categories' nameKey='amount' />
        <DynamicChart data={data.expenses} dataKey='merchant' nameKey='amount' />
      </Dynamic>
      <ResultData>
        <Result variant='inherit'>Total Income: ${data.totalIncome}</Result>
        <Result variant='inherit'>Total Expenses: ${data.totalExpenses}</Result>
      </ResultData>
    </MainContainer>
  );
};

export default Dashboard;