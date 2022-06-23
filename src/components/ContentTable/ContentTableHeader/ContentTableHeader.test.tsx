import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import store from '../../../redux/store';
import ContentTableHeader from './ContentTableHeader';


const mockedColumns = [
  {
    sortKey: 'amount',
    label: 'Amount',
    isSortable: true,
  },
  {
    sortKey: 'category',
    label: 'Category',
    isSortable: false,
  },
];

describe('Content Table Header tests', () => {
  it('should render the Content Table Header component', () => {
    const { container } = render(
      <Provider store={store}>
        <ContentTableHeader 
          columns={mockedColumns}
        />
      </Provider>
    );
    
    const cells = container.querySelectorAll('th');
    expect(cells.length).toBe(mockedColumns.length);
  });
});