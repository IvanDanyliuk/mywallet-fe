import { ListItemIcon, Menu, MenuItem } from '@mui/material';
import { Box } from '@mui/system';
import styled from 'styled-components';

export const OptionsMenuContainer = styled(Box)``;

export const OptionsButton = styled.button`
  cursor: pointer;
  position: absolute;
  right: 0;
  height: 100%;
  background: transparent;
  border: none;
`;

export const Options = styled(Menu)``;

export const Option = styled(MenuItem)`
  
`;

export const OptionIcon = styled(ListItemIcon)`
  display: flex;
  align-items: center;
  font-size: 14px;

  svg {
    font-size: 18px;
  }
`;