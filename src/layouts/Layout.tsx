import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from '../components/Navigation/Navigation';
import { getPageTitleFromUrl } from '../helpers/helpers';
import { Drawer } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { AppContent, AppHeader, Greeting, MainContainer, MenuButton } from './styles';


interface Props {
  children: React.ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {
  const { pathname } = useLocation();
  const title = getPageTitleFromUrl(pathname);

  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname])

  return (
    <MainContainer>
      <AppHeader component='header'>
        <MenuButton onClick={handleMenuToggle}>
          <MenuIcon />
        </MenuButton>
        <Greeting>Good Afternoon, John!</Greeting>
      </AppHeader>
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