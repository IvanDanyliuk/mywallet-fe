import { screen, render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CreateButton from './CreateButton';


const mockedProps = {
  title: 'Title',
  clickHandler: jest.fn(),
};

describe('Create Button tests', () => {
  beforeEach(() => {
    render(
      <CreateButton
        title={mockedProps.title}
        clickHandler={mockedProps.clickHandler}
      />
    );
  });

  it('should render Create Button', () => {
    const button = screen.getByText(mockedProps.title);
    expect(button).toBeInTheDocument();
  });

  it('should trigger click handler after clicking on the button', () => {
    const button = screen.getByText(mockedProps.title);
    fireEvent.click(button);
    expect(mockedProps.clickHandler).toHaveBeenCalled();
  });
});