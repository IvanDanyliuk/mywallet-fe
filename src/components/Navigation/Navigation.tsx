import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatchType } from '../../redux/store';
import { logout } from '../../redux/user/reducers';
import { IUserState } from '../../redux/user/types'; 
import { 
  UserImage, 
  NavWrapper, 
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
  //@ts-ignore
  const user = useSelector((state: IUserState) => state.user.user);
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
          <NavItem to='/'>{t('navLinkDashboard')}</NavItem>
          <NavItem to='/incomes'>{t('navLinkIncomes')}</NavItem>
          <NavItem to='/expenses'>{t('navLinkExpenses')}</NavItem>
          <NavItem to='/reports'>{t('navLinkReports')}</NavItem>
          <NavItem to='/settings'>{t('navLinkSettings')}</NavItem>
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