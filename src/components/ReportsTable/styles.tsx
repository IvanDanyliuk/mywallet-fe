import { Button, ButtonBase, Paper, Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';
import styled from 'styled-components';

export const PaperContainer = styled(Paper)``;

export const ReportTableContainer = styled(Table)`
  position: relative;
  width: 100%;
`;

export const ReportsHeader = styled(TableHead)`
  position: relative;
  width: 100%;
`;

export const HeaderRow = styled(TableRow)`
  position: relative;
  width: 100%;
`;

export const HeaderCell = styled(TableCell)`
  position: relative;
  width: ${(props => {
    if(props.datatype === 'createdAt') return '10%';
    if(props.datatype === 'heading') return '25%';
    if(props.datatype === 'period') return '20%';
    if(props.datatype === 'comment') return '45%';
  })};
`;

export const SortLabel = styled(TableSortLabel)``;

export const ReportsBody = styled(TableBody)``;

export const ContentRow = styled(TableRow)`
  position: relative;
`;

export const ContentCell = styled(TableCell)`

`;

export const ReportButton = styled(ButtonBase)`
  cursor: pointer;
`;

export const DeleteButton = styled(Button)`
  cursor: pointer;
  position: absolute;
  right: 0;
  height: 100%;
  background: transparent;
  border: none;
`;