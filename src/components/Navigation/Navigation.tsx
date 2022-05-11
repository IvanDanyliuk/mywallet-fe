import React from 'react';
import { UserImage, NavWrapper, Logo, Navbar, NavItem, ProfileData, UserName, MainContainer } from './styles';
import avatar from '../../assets/images/avatar.jpg';


const Navigation: React.FC = () => {
  return (
    <NavWrapper>
      <MainContainer>
        <ProfileData>
          <UserImage src={avatar} alt='avatar' />
          <UserName>John Doe</UserName>
        </ProfileData>
        <Navbar>
          <NavItem to='/'>Dashboard</NavItem>
          <NavItem to='/incomes'>Incomes</NavItem>
          <NavItem to='/expenses'>Expenses</NavItem>
          <NavItem to='/reports'>Reports</NavItem>
          <NavItem to='/settings'>Settings</NavItem>
        </Navbar>
      </MainContainer>
      <Logo>MyWallet</Logo>
    </NavWrapper>
  );
};

export default Navigation;