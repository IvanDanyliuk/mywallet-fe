import { screen, render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import store from '../../../redux/store';
import Language from './Language';


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

describe('Language select tests', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <Language />
      </Provider>
    );
  });

  it('should render the Language component', () => {
    const title = screen.getByText('languageSectionTitle')
    expect(title).toBeInTheDocument();
  });

  it('should change the language value after selection', async () => {
    const select = screen.getByTestId('languageSelect') as HTMLElement;
    fireEvent.change(select, { target: { value: 'ua' } });
    const changedSelect = screen.getByText('languageOptionUa') as HTMLElement;
    expect(changedSelect).toBeInTheDocument();
  });
});