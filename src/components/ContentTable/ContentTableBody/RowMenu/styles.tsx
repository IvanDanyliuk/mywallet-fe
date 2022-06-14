import styled from 'styled-components';
import { Box, ListItemIcon, Menu, MenuItem } from '@mui/material';


export const OptionsMenuContainer = styled(Box)``;

export const OptionsButton = styled.button`
  cursor: pointer;
  padding: 0;
  height: 100%;
  background: transparent;
  border: none;
`;

export const Options = styled(Menu)``;

export const Option = styled(MenuItem)``;

export const OptionIcon = styled(ListItemIcon)`
  display: flex;
  align-items: center;
  font-size: 14px;

  svg {
    font-size: 18px;
  }
`;