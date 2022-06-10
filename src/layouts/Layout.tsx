import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Drawer } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Navigation from '../components/Navigation/Navigation';
import { ILayout } from '../redux/general';
import { IUserState } from '../redux/user/types';
import { 
  AppContent, 
  AppHeader, 
  Greeting, 
  MainContainer, 
  MenuButton 
} from './styles';
import { setGreeting } from '../helpers/helpers';

const Layout: React.FC<ILayout> = ({ children }) => {
  const { pathname } = useLocation();
  //@ts-ignore
  const user = useSelector((state: IUserState) => state.user.user);
  const language = localStorage.getItem('lang') || 'en';

  const [menuOpen, setMenuOpen] = useState(false);

  const greeting = setGreeting(language);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname])

  return (
    <MainContainer>
      {user && (
        <AppHeader component='header'>
          <MenuButton onClick={handleMenuToggle}>
            <MenuIcon />
          </MenuButton>
          <Greeting>{greeting}, {user.firstName}!</Greeting>
        </AppHeader>
      )}
      <AppContent>
        <Drawer open={menuOpen} onClose={handleMenuToggle}>
          <Navigation />
        </Drawer>
        { children }
      </AppContent>
    </MainContainer>
  );
}

export default Layout;