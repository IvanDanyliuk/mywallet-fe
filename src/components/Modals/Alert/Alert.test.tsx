import { screen, render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Alert from './Alert';


const handlerMock = jest.fn();
const titleText = 'Alert Title'

describe('Alert tests', () => {
  beforeEach(() => {
    render(
      <Alert 
        isOpen={true}
        title={titleText}
        handler={handlerMock}
      />
    );
  });

  it('should render opened alert component', () => {
    const title = screen.getByText(titleText);
    expect(title).toBeInTheDocument();
  });

  it('should trigger handler function after clicking the close icon', () => {
    const closeBtn = screen.getByRole('button');
    fireEvent.click(closeBtn);
    expect(handlerMock).toHaveBeenCalled();
  });
});