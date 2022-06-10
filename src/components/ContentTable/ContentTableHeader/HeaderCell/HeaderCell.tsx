import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { sortIncomes } from '../../../../redux/incomes/reducers';
import { AppDispatchType } from '../../../../redux/store';
import { ITableHeaderCell, TableSortOrder } from '../../../../redux/general';
import { CellBody, SortLabel } from './styles';


const HeaderCell: React.FC<ITableHeaderCell> = ({ sortKey, label, isSortable, type }) => {
  const dispatch = useDispatch<AppDispatchType>();
  const [order, setOrder] = useState(TableSortOrder.desc);

  const handleSort = ( key: string ) => {
    if(order === 'asc') {
      setOrder(TableSortOrder.desc);
      dispatch(sortIncomes({key, order}));
    };
    if(order === 'desc') {
      setOrder(TableSortOrder.asc);
      dispatch(sortIncomes({key, order}));
    };
  };
  
  return (
    <CellBody datatype={type}>
      {
        isSortable ? (
          <SortLabel
            active
            direction={order}
            onClick={() => handleSort(sortKey)}
          >
            {label}
          </SortLabel>
        ) : (
          label
        )
      }
    </CellBody>
  );
};

export default HeaderCell;