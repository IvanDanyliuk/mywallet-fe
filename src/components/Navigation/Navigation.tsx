import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { AppDispatchType } from '../../redux/store';
import { logout } from '../../redux/user/reducers';
import { selectUser } from '../../redux/user/selectors';
import { 
  UserImage, 
  NavWrapper, 
  Link,
  Logo, 
  Navbar, 
  NavItem, 
  ProfileData, 
  UserName, 
  MainContainer, 
  LogoutButton 
} from './styles';


const Navigation: React.FC = () => {
  const { t } = useTranslation(['navigation']);
  const dispatch = useDispatch<AppDispatchType>();
  
  const user = useSelector(selectUser);
  
  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <NavWrapper>
      <MainContainer>
        <ProfileData>
          {user && (
            <>
              <UserImage src={user.avatar} alt='avatar' />
              <UserName variant='inherit'>{`${user.firstName} ${user.lastName}`}</UserName>
            </>
          )}
        </ProfileData>
        <Navbar>
          <NavItem>
            <Link to='/'>{t('navLinkDashboard')}</Link>
          </NavItem>
          <NavItem>
            <Link to='/incomes'>{t('navLinkIncomes')}</Link>
          </NavItem>
          <NavItem>
            <Link to='/expenses'>{t('navLinkExpenses')}</Link>
          </NavItem>
          <NavItem>
            <Link to='/reports'>{t('navLinkReports')}</Link>
          </NavItem>
          <NavItem>
            <Link to='/exchange'>{t('navLinkExchange')}</Link>
          </NavItem>
          <NavItem>
            <Link to='/settings'>{t('navLinkSettings')}</Link>
          </NavItem>
        </Navbar>
        {user && (
          <LogoutButton 
            variant='outlined' 
            onClick={logoutHandler}
            fullWidth
          >
            {t('logoutBtn')}
          </LogoutButton>
        )}
      </MainContainer>
      <Logo>{t('logo')}</Logo>
    </NavWrapper>
  );
};

export default Navigation;