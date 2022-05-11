import React from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from '../components/Navigation/Navigation';
import { getPageTitleFromUrl } from '../helpers/helpers';
import { Content, LayoutSection, MainContainer, PageHeading } from './styles';

interface Props {
  children: React.ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {
  const { pathname } = useLocation();
  const title = getPageTitleFromUrl(pathname);

  return (
    <MainContainer container>
      <LayoutSection item xs={2}>
        <Navigation />
      </LayoutSection>
      <LayoutSection item xs={10}>
        <PageHeading>
          {title}
        </PageHeading>
        <Content>
          {children}
        </Content>
      </LayoutSection>
    </MainContainer>
  );
}

export default Layout;