import React from 'react';
import { UserImage, NavWrapper, Logo, Navbar, NavItem, ProfileData, UserName, MainContainer, LogoutButton } from './styles';
import avatar from '../../assets/images/avatar.jpg';
import { useDispatch } from 'react-redux';
import { AppDispatchType } from '../../redux/store';
import { logout } from '../../redux/user/reducers';
import { useSelector } from 'react-redux';

const Navigation: React.FC = () => {
  const dispatch = useDispatch<AppDispatchType>();
  //@ts-ignore
  const user = useSelector((state: IUserState) => state.user.user);
  const logoutHandler = () => {
    dispatch(logout());
  };

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
        {user && (
          <LogoutButton 
            variant='outlined' 
            onClick={logoutHandler}
          >Logout</LogoutButton>
        )}
      </MainContainer>
      <Logo>MyWallet</Logo>
    </NavWrapper>
  );
};

export default Navigation;