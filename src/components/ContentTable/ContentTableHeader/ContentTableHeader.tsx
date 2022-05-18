import { TableSortLabel } from '@mui/material';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import HeaderCell from './HeaderCell/HeaderCell';
import { HeaderContainer, HeaderRow } from './styles'

interface IContentTableHeader {
  type: string;
  columns?: {
    sortKey: string;
    label: string;
    isSortable: boolean;
  }[]
};

const ContentTableHeader: React.FC<IContentTableHeader> = ({ type }) => {
  const columns = [
    {
      sortKey: 'createdAt',
      label: 'Date',
      isSortable: true,
    },
    {
      sortKey: 'source',
      label: 'Source',
      isSortable: true,
    },
    {
      sortKey: 'amount',
      label: 'Amount',
      isSortable: true,
    },
    {
      sortKey: 'category',
      label: 'Category',
      isSortable: false,
    },
    {
      sortKey: 'description',
      label: 'Description',
      isSortable: false,
    },
  ];

  return (
    <HeaderContainer>
      <HeaderRow>
        {
          columns.map(column => (
            <HeaderCell 
              key={column.sortKey}
              type={column.sortKey}
              sortKey={column.sortKey}
              label={column.label}
              isSortable={column.isSortable}
            />
          ))
        }
      </HeaderRow>
    </HeaderContainer>
  );
};

export default ContentTableHeader;