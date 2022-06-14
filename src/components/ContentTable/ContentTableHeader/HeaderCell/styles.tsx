import { TableCell, TableSortLabel } from '@mui/material';
import styled from 'styled-components';

export const CellBody = styled(TableCell)`
  position: relative;
  width: ${(props => {
    if(props.datatype === 'date') return '10%';
    if(props.datatype === 'source') return '25%';
    if(props.datatype === 'amount') return '15%';
    if(props.datatype === 'category') return '15%';
    if(props.datatype === 'description') return '34%';
    if(props.datatype === 'actions') return '1%';
  })};
`;

export const SortLabel = styled(TableSortLabel)``;