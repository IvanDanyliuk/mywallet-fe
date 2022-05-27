import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { sortIncomes } from '../../../../redux/incomes/reducers';
import { AppDispatchType } from '../../../../redux/store';
import { CellBody, SortLabel } from './styles';

interface IHeaderCell {
  type: string;
  sortKey: string;
  label: string;
  isSortable: boolean;
};

enum SortOrder {
  asc = 'asc',
  desc = 'desc',
};

const HeaderCell: React.FC<IHeaderCell> = ({ sortKey, label, isSortable, type }) => {
  const dispatch = useDispatch<AppDispatchType>();
  const [order, setOrder] = useState(SortOrder.desc);

  const handleSort = ( key: string ) => {
    if(order === 'asc') {
      setOrder(SortOrder.desc);
      dispatch(sortIncomes({key, order}));
    };
    if(order === 'desc') {
      setOrder(SortOrder.asc);
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