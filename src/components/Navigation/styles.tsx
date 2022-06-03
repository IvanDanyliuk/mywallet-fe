import { Box, Avatar, Typography, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const NavWrapper = styled(Box)`
  padding: 20px;
  width: 200px;
  height: 100vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  background: #172841;
  box-sizing: border-box;

  @media (max-width: 576px) {
    width: 80vw;
  }
`;

export const ProfileData = styled(Box)`
  padding: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 576px) {
    padding: 1vh 0;
  }
`;

export const MainContainer = styled(Box)``;

export const UserImage = styled(Avatar)`
  margin-bottom: 10px;
  width: 50px;
  height: 50px;
`;

export const UserName = styled(Typography)`
  font-family: 'Urbanist', sans-serif;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 3px;
  color: #ffffff;

  @media (max-width: 576px) {
    font-size: 20px;
  }
`;

export const Navbar = styled.ul`
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const NavItem = styled(NavLink)`
  padding: 10px 0;
  font-weight: 700;
  text-decoration: none;
  color: #949494;

  &.active {
    color: #ffffff;
  }

  @media (max-width: 576px) {
    padding: 2vh 0;
    font-size: 26px;
  }
`;

export const LogoutButton = styled(Button)`
  @media (max-width: 576px) {
    height: 70px;
  }
`;

export const Logo = styled.h1`
  font-family: 'Caveat', cursive;
  text-align: center;
  color: #ffffff;
`;