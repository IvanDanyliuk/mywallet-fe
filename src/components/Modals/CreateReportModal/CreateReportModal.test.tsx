import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import store from '../../../redux/store';
import CreateReportModal from './CreateReportModal';


const mockedStore = {
  ...store.getState(),
  incomes: {
    incomes: [
      {
        _id:'629799e37d83491f6a630f68',
        userId:'6295f2be26cf5e82fcc3b1ca',
        title:'Salary',
        amount:2200,
        category:'Regular',
        description:'This is my salary per month.',
        badgeColor:'',
        createdAt:'2022-06-01T14:37:26.178Z',
        __v:0,
      },
      {
        _id: '62979a047d83491f6a630f6a',
        userId: '6295f2be26cf5e82fcc3b1ca',
        title: 'Deposit revenue',
        amount: 150,
        category: 'Regular',
        description: 'Deposit interest per month.',
        badgeColor: '#cfb8ea',
        createdAt: '2022-06-04T14:37:26.178Z',
        __v: 0,
      }
    ],
    status: 'succeeded',
    error: null,
  },
  expenses: {
    expenses: [
      {
        _id: '6297a3397d83491f6a630f72',
        userId: '6295f2be26cf5e82fcc3b1ca',
        title: 'Garage rent',
        amount: 20,
        category: 'Rent',
        description: 'Garage rent per month.',
        badgeColor: '',
        createdAt: '2022-06-01T14:37:26.220Z',
        __v: 0,
      },
      {
        _id: '6297a3597d83491f6a630f74',
        userId: '6295f2be26cf5e82fcc3b1ca',
        title: 'Taxes payment',
        amount: 150,
        category: 'Taxes',
        description: 'Taxes payment for current month.',
        badgeColor: '#eee37c',
        createdAt: '2022-06-04T14:37:26.220Z',
        __v: 0,
      }
    ],
    status: 'succeeded',
    error: null,
  },
};

store.getState = () => mockedStore;

const openModalForm = () => {
  const openBtn = screen.getByRole('button');
  fireEvent.click(openBtn);
};


describe('CreateReportModal tests', () => {
  beforeEach(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: (query: any) => ({
        media: query,
        matches: query === "(pointer: fine)",
        onchange: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        addListener: () => {},
        removeListener: () => {},
        dispatchEvent: () => false,
      }),
    });

    render(
      <Provider store={store}>
        <CreateReportModal />
      </Provider>
    )
  });

  afterEach(() => {
    //@ts-ignore
    delete window.matchMedia;
  })

  it('should open the modal form after clicking the button', async () => {
    openModalForm();
    const modalForm = screen.getByRole('dialog');
    expect(modalForm).toBeInTheDocument();
  });

  it('should submit form data after clicking the submit button', async () => {
    openModalForm();
    const inputs = screen.getAllByRole('textbox')
    const submitBtn = screen.getByRole('button', { name: 'modalFormSubmitBtn' });

    fireEvent.change(inputs[0], { target: { value: 'New Report' } });
    fireEvent.change(inputs[1], { target: { value: '06/01/2022' } });
    fireEvent.change(inputs[2], { target: { value: '06/25/2022' } });
    fireEvent.change(inputs[3], { target: { value: 'New comment' } });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(submitBtn).not.toBeVisible();
    });
  });
});