import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '../../redux/store';
import ReportsTable from './ReportsTable';


const mockedStore = {
  ...store.getState(),
  reports: {
    reports: [
      {
        period: {
          from: '2022-05-31T21:00:00.000Z',
          to: '2022-06-06T21:00:00.000Z'
        },
        data: { 
          incomes: [
            {
              source: 'Salary',
              amount: 2200,
              badgeColor: '#1373cf',
              _id: '62a1bf6bb8d2482aba0870a2',
            },
            {
              source: 'Deposit revenue',
              amount: 150,
              badgeColor: '#c85750',
              _id: '62a1bf6bb8d2482aba0870a3',
            }
          ], 
          expenses: [
            {
              source: 'Garage rent',
              amount: 20,
              badgeColor: '#56fc1a',
              _id: '62a1bf6bb8d2482aba0870a5',
            },
            {
              source: 'Taxes payment',
              amount: 150,
              badgeColor: '#4516c5',
              _id: '62a1bf6bb8d2482aba0870a6',
            }
          ], 
        },
        _id: '62b731639294fe076900fa5f',
        userId: '6295f2be26cf5e82fcc3b1ca',
        heading: 'New Report 1',
        comment: 'asdasdas',
        createdAt: '2022-06-25T16:01:26.743Z',
        __v: 0
      },
      {
        period: {
          from: '2022-05-31T21:00:00.000Z',
          to: '2022-06-06T21:00:00.000Z'
        },
        data: { 
          incomes: [
            {
              source: 'Salary',
              amount: 2200,
              badgeColor: '#1373cf',
              _id: '62a1bf6bb8d2482aba0870a2',
            },
            {
              source: 'Deposit revenue',
              amount: 150,
              badgeColor: '#c85750',
              _id: '62a1bf6bb8d2482aba0870a3',
            }
          ], 
          expenses: [
            {
              source: 'Garage rent',
              amount: 20,
              badgeColor: '#56fc1a',
              _id: '62a1bf6bb8d2482aba0870a5',
            },
            {
              source: 'Taxes payment',
              amount: 150,
              badgeColor: '#4516c5',
              _id: '62a1bf6bb8d2482aba0870a6',
            }
          ], 
        },
        _id: '62b731639294fe076900fa5f',
        userId: '6295f2be26cf5e82fcc3b1ca',
        heading: 'New Report 2',
        comment: 'asdasdas',
        createdAt: '2022-06-25T16:01:26.743Z',
        __v: 0
      },
    ],
    openedReport: null,
    status: 'succeeded',
    error: null,
  },
};

//@ts-ignore
store.getState = () => mockedStore;

const mockedUseDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockedUseDispatch,
}));

const mockedUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigate,
}));


describe('ReportsTable tests', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ReportsTable />
        </BrowserRouter>
      </Provider>
    );
  });

  it('should render the ReportsTable component', () => {
    const tableRows = screen.getAllByTestId('tableRow')
    expect(tableRows.length).toBe(mockedStore.reports.reports.length);
  });

  it('should change the data order after clicking a sort button', async () => {
    const sortArrowDownBtn = screen.getByTestId('ArrowDownwardIcon');
    fireEvent.click(sortArrowDownBtn);
    const tableRows = screen.getAllByTestId('tableRow')
    expect(tableRows.length).toBe(mockedStore.reports.reports.length);
  });

  it('should switch to another page after clicking the open report button', async () => {
    const menuBtn = screen.getAllByTestId('MoreVertIcon');
    fireEvent.click(menuBtn[0]);
    const openReportBtn = screen.getByTestId('FolderOpenIcon');
    fireEvent.click(openReportBtn);
    expect(mockedUseNavigate).toHaveBeenCalled();
  });

  it('should delete the report item after clicking the delete button', async () => {
    const menuBtn = screen.getAllByTestId('MoreVertIcon');
    fireEvent.click(menuBtn[0]);
    const deleteReportBtn = screen.getByTestId('DeleteIcon');
    fireEvent.click(deleteReportBtn);
    expect(mockedUseDispatch).toHaveBeenCalled();
  });
});