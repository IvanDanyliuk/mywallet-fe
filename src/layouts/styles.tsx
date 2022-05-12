import { AppBar, Box, Button, Container, Grid } from '@mui/material';
import styled from 'styled-components';

export const MainContainer = styled(Box)`
  
`;

export const AppHeader = styled(Box)`
  position: fixed;
  padding: 0 20px;
  width: 100%;
  height: 10vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #172841;
  box-sizing: border-box;
  z-index: 100;
`;

export const MenuButton = styled.button`
  cursor: pointer;
  padding: 0;
  background: transparent;
  border: none;
  svg {
    font-size: 30px;
    color: #ffffff;
  }
`;

export const Greeting = styled(Box)`
  color: #ffffff;
`;

export const AppContent = styled(Box)`
  padding: 20px;
  padding-top: calc(10vh + 20px);
  position: relative;
  width: 100%;
  min-height: 90vh;
  background: #ffffff;
  box-sizing: border-box;
`;