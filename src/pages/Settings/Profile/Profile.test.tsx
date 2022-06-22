import { screen, render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import store from '../../../redux/store';
import Profile from './Profile';


describe('Profile tests', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <Profile />
      </Provider>
    );
  });

  it('should render the Profile component', () => {
    const title = screen.getByText('profileSectionTitle');
    expect(title).toBeInTheDocument();
  });

  it('should open the user updation modal', async () => {
    const openModalBtn = screen.getByText('updateUserTitle');
    fireEvent.click(openModalBtn);
    const modal = await screen.findByRole('dialog');
    expect(modal).toBeInTheDocument();
  });
});