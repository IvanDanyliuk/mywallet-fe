import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import store from '../../redux/store';
import Settings from './Settings';


jest.mock('react-i18next', () => ({
  ...jest.requireActual,
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
  initReactI18next: { type: '3rdParty', init: jest.fn(), },
}));


describe('Settings page tests', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <Settings />
      </Provider>
    );
  });

  it('should render the Settings page', () => {
    const title = screen.getByText('profileSectionTitle');
    expect(title).toBeInTheDocument();
  });
});