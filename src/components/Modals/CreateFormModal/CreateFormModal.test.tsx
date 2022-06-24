import { screen, render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import store from '../../../redux/store';
import { FormModalType } from '../../../redux/general';
import CreateFormModal from './CreateFormModal';


const mockedProps = {
  type: {
    incomes: FormModalType.Incomes,
    expenses: FormModalType.Expenses,
  },
  id: 'create-modal-form-id-1',
  open: true,
  onClose: jest.fn(),
};

describe('CreateFormModal tests', () => {
  describe('CreateFormModal tests for the Incomes page', () => {
    it('should submit filled updation form after clicking the submit button', async () => {
      render(
        <Provider store={store}>
          <CreateFormModal 
            type={mockedProps.type.incomes}
            open={mockedProps.open}
            id={mockedProps.id}
            onClose={mockedProps.onClose}
          />
        </Provider>
      );
  
      const inputs = screen.getAllByTestId('createFormInput').map(item => item.querySelector('input' || 'div') as HTMLInputElement);
      const form = screen.getByRole('dialog').querySelector('form') as HTMLFormElement;
  
      fireEvent.change(inputs[0], { target: { value: 'New title' } });
      fireEvent.change(inputs[1], { target: { value: 100 } });
      fireEvent.change(inputs[2], { target: { value: 'Regular' } });
      fireEvent.change(inputs[3], { target: { value: 'New description' } });
      fireEvent.submit(form);
  
      const element = screen.queryByText('New title') as HTMLElement
      expect(element).not.toBeInTheDocument();
    });
  
    it('should submit filled creation form after clicking the submit button', async () => {
      render(
        <Provider store={store}>
          <CreateFormModal 
            type={mockedProps.type.incomes}
            open={mockedProps.open}
            onClose={mockedProps.onClose}
          />
        </Provider>
      );
  
      const inputs = screen.getAllByTestId('createFormInput').map(item => item.querySelector('input' || 'div') as HTMLInputElement);
      const form = screen.getByRole('dialog').querySelector('form') as HTMLFormElement;
  
      fireEvent.change(inputs[0], { target: { value: 'New title' } });
      fireEvent.change(inputs[1], { target: { value: 100 } });
      fireEvent.change(inputs[2], { target: { value: 'All' } });
      fireEvent.change(inputs[3], { target: { value: 'New description' } });
      fireEvent.submit(form);
  
      const element = screen.queryByText('New title') as HTMLElement
      expect(element).not.toBeInTheDocument();
    });
  });

  describe('CreateFormModal tests for the Expenses page', () => {
    it('should submit filled updation form after clicking the submit button', async () => {
      render(
        <Provider store={store}>
          <CreateFormModal 
            type={mockedProps.type.expenses}
            open={mockedProps.open}
            id={mockedProps.id}
            onClose={mockedProps.onClose}
          />
        </Provider>
      );
  
      const inputs = screen.getAllByTestId('createFormInput').map(item => item.querySelector('input' || 'div') as HTMLInputElement);
      const form = screen.getByRole('dialog').querySelector('form') as HTMLFormElement;
  
      fireEvent.change(inputs[0], { target: { value: 'New title' } });
      fireEvent.change(inputs[1], { target: { value: 100 } });
      fireEvent.change(inputs[2], { target: { value: 'Regular' } });
      fireEvent.change(inputs[3], { target: { value: 'New description' } });
      fireEvent.submit(form);
  
      const element = screen.queryByText('New title') as HTMLElement
      expect(element).not.toBeInTheDocument();
    });
  
    it('should submit filled creation form after clicking the submit button', async () => {
      render(
        <Provider store={store}>
          <CreateFormModal 
            type={mockedProps.type.expenses}
            open={mockedProps.open}
            onClose={mockedProps.onClose}
          />
        </Provider>
      );
  
      const inputs = screen.getAllByTestId('createFormInput').map(item => item.querySelector('input' || 'div') as HTMLInputElement);
      const form = screen.getByRole('dialog').querySelector('form') as HTMLFormElement;
  
      fireEvent.change(inputs[0], { target: { value: 'New title' } });
      fireEvent.change(inputs[1], { target: { value: 100 } });
      fireEvent.change(inputs[2], { target: { value: 'All' } });
      fireEvent.change(inputs[3], { target: { value: 'New description' } });
      fireEvent.submit(form);
  
      const element = screen.queryByText('New title') as HTMLElement
      expect(element).not.toBeInTheDocument();
    });
  });
});