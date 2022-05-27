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
`;

export const ProfileData = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const MainContainer = styled(Box)``;

export const UserImage = styled(Avatar)``;

export const UserName = styled(Typography)`
  font-family: 'Urbanist', sans-serif;
  font-weight: 700;
  letter-spacing: 3px;
  color: #ffffff;
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
`;

export const LogoutButton = styled(Button)``;

export const Logo = styled.h1`
  font-family: 'Caveat', cursive;
  text-align: center;
  color: #ffffff;
`;