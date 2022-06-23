import { screen, render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import ContentTableBody from './ContentTableBody';
import { Provider } from 'react-redux';
import store from '../../../redux/store';
import { DataType } from '../../../redux/general';


describe('Content Table Body tests', () => {
  describe('Content Table tests with page number > 0', () => {
    const mockedProps = {
      dataToRender: [
        {
          amount: 2200,
          badgeColor: '',
          category: 'Regular',
          createdAt: '2022-06-01T14:37:26.178Z',
          description: 'This is my salary per month.',
          title: 'Salary',
          userId: '6295f2be26cf5e82fcc3b1ca',
          __v: 0,
          _id: '629799e37d83491f6a630f68',
        },
        {
          amount: 150,
          badgeColor: '#cfb8ea',
          category: 'Regular',
          createdAt: '2022-06-04T14:37:26.178Z',
          description: 'Deposit interest per month.',
          title: 'Deposit revenue',
          userId: '6295f2be26cf5e82fcc3b1ca',
          __v: 0,
          _id: '62979a047d83491f6a630f6a',
        },
        {
          amount: 700,
          badgeColor: '#97ce8f',
          category: 'Non-Regular',
          createdAt: '2022-06-01T14:37:26.178Z',
          description: 'Customer\'s payment.',
          title: 'Freelance',
          userId: '6295f2be26cf5e82fcc3b1ca',
          __v: 0,
          _id: '62979a187d83491f6a630f6c',
        }
      ],
      page: 0,
      rowsPerPage: 5,
      type: DataType.Incomes,
    };
    
    beforeEach(() => {
      render(
        <Provider store={store}>
          <ContentTableBody
            type={mockedProps.type}
            page={mockedProps.page}
            rowsPerPage={mockedProps.rowsPerPage}
            dataToRender={mockedProps.dataToRender}
          />
        </Provider>
      );
    });
  
    it('should render ContentTableBody component', () => {
      const tableRows = screen.getAllByTestId('tableRow');
      expect(tableRows.length).toBe(mockedProps.dataToRender.length);
    });
  
    it('should open row menu and close it after clicking the edit item button', async () => {
      const openMenuBtn = screen.getAllByTestId('MoreVertIcon');
      fireEvent.click(openMenuBtn[2]);
  
      const editIcon = screen.getByTestId('EditIcon');
      fireEvent.click(editIcon);
  
      expect(editIcon).not.toBeInTheDocument();
    });
  
    it('should open row menu and close it after clicking the delete item button (incomes)', async () => {
      const openMenuBtn = screen.getAllByTestId('MoreVertIcon');
      fireEvent.click(openMenuBtn[2]);
  
      const deleteIcon = screen.getByTestId('DeleteIcon');
      fireEvent.click(deleteIcon);
      userEvent.keyboard('{esc}');
  
      expect(deleteIcon).not.toBeVisible();
    });
  
    it('should open and close modal form after clicking the open button', async () => {
      const openMenuBtn = screen.getAllByTestId('MoreVertIcon');
      fireEvent.click(openMenuBtn[2]);
  
      const editIcon = screen.getByTestId('EditIcon');
      fireEvent.click(editIcon);
  
      userEvent.keyboard('{esc}');
      const updateBtn = await screen.findByText('updateBtn');
  
      expect(updateBtn).not.toBeVisible();
    });
  });

  describe('Content Table tests with page number equals to 0', () => {
    const mockedProps = {
      dataToRender: [
        {
          amount: 100,
          badgeColor: '',
          category: 'Rent',
          createdAt: '2022-06-01T14:37:26.178Z',
          description: 'Garage rent per month.',
          title: 'Garage rent',
          userId: '6295f2be26cf5e82fcc3b1ca',
          __v: 0,
          _id: '629799e37d83491f6a630f68',
        },
        {
          amount: 100,
          badgeColor: '',
          category: 'Rent',
          createdAt: '2022-06-01T14:37:26.178Z',
          description: 'Garage rent per month.',
          title: 'Garage rent',
          userId: '6295f2be26cf5e82fcc3b1ca',
          __v: 0,
          _id: '629799e37d83491f6a630f68',
        },
        {
          amount: 100,
          badgeColor: '',
          category: 'Rent',
          createdAt: '2022-06-01T14:37:26.178Z',
          description: 'Garage rent per month.',
          title: 'Garage rent',
          userId: '6295f2be26cf5e82fcc3b1ca',
          __v: 0,
          _id: '629799e37d83491f6a630f68',
        },
        {
          amount: 100,
          badgeColor: '',
          category: 'Rent',
          createdAt: '2022-06-01T14:37:26.178Z',
          description: 'Garage rent per month.',
          title: 'Garage rent',
          userId: '6295f2be26cf5e82fcc3b1ca',
          __v: 0,
          _id: '629799e37d83491f6a630f68',
        },
        {
          amount: 100,
          badgeColor: '',
          category: 'Rent',
          createdAt: '2022-06-01T14:37:26.178Z',
          description: 'Garage rent per month.',
          title: 'Garage rent',
          userId: '6295f2be26cf5e82fcc3b1ca',
          __v: 0,
          _id: '629799e37d83491f6a630f68',
        },
        {
          amount: 100,
          badgeColor: '',
          category: 'Rent',
          createdAt: '2022-06-01T14:37:26.178Z',
          description: 'Garage rent per month.',
          title: 'Garage rent',
          userId: '6295f2be26cf5e82fcc3b1ca',
          __v: 0,
          _id: '629799e37d83491f6a630f68',
        },
      ],
      page: 1,
      rowsPerPage: 5,
      type: DataType.Expenses,
    };

    beforeEach(() => {
      render(
        <Provider store={store}>
          <ContentTableBody
            type={mockedProps.type}
            page={mockedProps.page}
            rowsPerPage={mockedProps.rowsPerPage}
            dataToRender={mockedProps.dataToRender}
          />
        </Provider>
      );
    });

    it('should open row menu and close it after clicking the delete item button (expenses)', () => {
      const openMenuBtn = screen.getAllByTestId('MoreVertIcon');
      fireEvent.click(openMenuBtn[0]);
  
      const deleteIcon = screen.getByTestId('DeleteIcon');
      fireEvent.click(deleteIcon);
      userEvent.keyboard('{esc}');
  
      expect(deleteIcon).not.toBeVisible();
    });
  });
});