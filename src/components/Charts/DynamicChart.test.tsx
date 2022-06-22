import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import store from '../../redux/store';
import DynamicChart from './DynamicChart';
import { ChartParams } from '../../redux/general';


const mockedData = [
  {
    amount: 2200,
    badgeColor: "",
    category: "Regular",
    createdAt: "2022-06-01T14:37:26.178Z",
    description: "This is my salary per month.",
    title: "Salary",
    userId: "6295f2be26cf5e82fcc3b1ca",
    __v: 0,
    _id: "629799e37d83491f6a630f68",
  },
  {
    amount: 700,
    badgeColor: "",
    category: "Non-Regular",
    createdAt: "2022-06-01T14:37:26.178Z",
    description: "Customer\'s payment",
    title: "Freelance",
    userId: "6295f2be26cf5e82fcc3b1ca",
    __v: 0,
    _id: "629799e37d83491f6a630f68",
  },
];


describe('Dynamic Chart tests', () => {
  beforeEach(() => {
    render(
      <DynamicChart
        data={mockedData}
        dataKey={ChartParams.Title}
        nameKey={ChartParams.Amount}
      />
    );
  });

  it('should render chart', () => {
    screen.debug()
  })
})