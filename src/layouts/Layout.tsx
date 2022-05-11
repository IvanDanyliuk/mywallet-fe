import React from 'react';
import Navigation from '../components/Navigation/Navigation';
import { LayoutSection, MainContainer } from './styles';

interface Props {
  children: React.ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <MainContainer container>
      <LayoutSection item xs={2}>
        <Navigation />
      </LayoutSection>
      <LayoutSection item xs={10}>
        {children}
      </LayoutSection>
    </MainContainer>
  );
}

export default Layout;