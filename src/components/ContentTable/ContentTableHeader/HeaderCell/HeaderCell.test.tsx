import { screen, render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import HeaderCell from './HeaderCell';


const mockedUseDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual,
  useDispatch: () => mockedUseDispatch,
}));


describe('Header Cell tests', () => {
  it('should trigger sort method after clicking the arrow icon', () => {
    render(
      <HeaderCell 
        type='source'
        sortKey='source'
        label='Source'
        isSortable={true}
      />
    );

    const arrowIcon = screen.getByTestId('ArrowDownwardIcon');
    fireEvent.click(arrowIcon);
    fireEvent.click(arrowIcon);
    expect(mockedUseDispatch).toHaveBeenCalledTimes(2);
  });

  it('should render non-sortable cell', () => {
    render(
      <HeaderCell 
        type='category'
        sortKey='category'
        label='Category'
        isSortable={false}
      />
    );

    const arrowIcon = screen.queryByTestId('ArrowDownwardIcon');
    expect(arrowIcon).not.toBeInTheDocument();
  });
});