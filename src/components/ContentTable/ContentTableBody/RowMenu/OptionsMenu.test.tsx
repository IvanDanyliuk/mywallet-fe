import { screen, render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import OptionsMenu from './OptionsMenu';
import { OptionsMenuType } from '../../../../redux/general';


describe('OptionsMenu tests', () => {
  describe('OptionsMenu for the Content table', () => {
    const mockedProps = {
      id: 'content-item-id',
      type: OptionsMenuType.Content,
      onOpen: jest.fn(),
      onEdit: jest.fn(),
      onDelete: jest.fn(),
    };

    beforeEach(() => {
      render(
        <OptionsMenu 
          id={mockedProps.id}
          type={mockedProps.type}
          onOpen={mockedProps.onOpen}
          onEdit={mockedProps.onEdit}
          onDelete={mockedProps.onDelete}
        />
      );
    });
  
    it('should render Options Menu component', () => {
      const openMenuBtn = screen.getByTestId('MoreVertIcon');
      expect(openMenuBtn).toBeInTheDocument();
    });
  
    it('should open menu after clicking the open button', async () => {
      const openMenuBtn = screen.getByTestId('MoreVertIcon');
      fireEvent.click(openMenuBtn);
      const menu = screen.getByRole('menu');
      expect(menu).toBeVisible();
    });
  
    it('should close menu after clicking the menu button', async () => {
      const openMenuBtn = screen.getByTestId('MoreVertIcon');
      fireEvent.click(openMenuBtn);
      const menu = await screen.findByRole('menu');
      userEvent.keyboard('{esc}');
      expect(menu).not.toBeVisible();
    })
  });

  describe('OptionMenu for the Reports table', () => {
    const mockedProps = {
      id: 'content-item-id',
      type: OptionsMenuType.Reports,
      onOpen: jest.fn(),
      onEdit: jest.fn(),
      onDelete: jest.fn(),
    };

    it('should render Options Menu component', () => {
      render(
        <OptionsMenu 
          id={mockedProps.id}
          type={mockedProps.type}
          onOpen={mockedProps.onOpen}
          onEdit={mockedProps.onEdit}
          onDelete={mockedProps.onDelete}
        />
      );

      const openMenuBtn = screen.getByTestId('MoreVertIcon');
      expect(openMenuBtn).toBeInTheDocument();
    });
  });
});