import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import store from '../../../redux/store';
import UserUpdationModal from './UserUpdationModal';


const mockedStore = {
  ...store.getState(),
  user: {
    user: {
      _id: '6295f2be26cf5e82fcc3b1ca',
      firstName: 'Johnny',
      lastName: 'Doe',
      email: 'j.doe@gmail.com',
      password: '$2a$12$VSqDjXVvCD0d7bl9sXVGUeTQOmt33f303Hr7GuppVT2.NulxaCoJ.',
      avatar: 'https://firebasestorage.googleapis.com/v0/b/my-wallet-be092.appspot.com/o/files%2Favatar.jpg?alt=media&token=a70f3ac4-20fb-454a-ac24-6781c855bc72',
      language: 'ua',
      currency: 'usd',
      __v: 0,
    },
    status: 'succeeded',
    error: null,
  },
};

store.getState = () => mockedStore;

const closeHandler = jest.fn();

const fillForm = () => {
  const inputs = screen.getAllByTestId('formInput').map(item => item.querySelector('input') as HTMLInputElement);
  fireEvent.change(inputs[0], { target: { value: 'John' } });
  fireEvent.change(inputs[1], { target: { value: 'Doe' } });
  fireEvent.change(inputs[2], { target: { value: 'j.doe@gmail.com' } });
};


describe('UserUpdationModal tests', () => {
  it('should submit filled modal form and close it after', async () => {
    render(
      <Provider store={store}>
        <UserUpdationModal 
          open={true}
          onClose={closeHandler}
        />
      </Provider>
    );

    fillForm();
    const submitBtn = screen.getByRole('button', { name: 'Update' });
    await waitFor(() => {
      fireEvent.click(submitBtn);
      expect(closeHandler).toHaveBeenCalled();
    });
  });
});