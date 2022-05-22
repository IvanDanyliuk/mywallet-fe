import React, { ChangeEvent, useState } from 'react'
import { useSelector } from 'react-redux';
import { TablePagination } from '@mui/material';
import { IState } from '../../types/general';
import ContentTableBody from './ContentTableBody/ContentTableBody';
import ContentTableHeader from './ContentTableHeader/ContentTableHeader';
import { ContentTableContainer, PaperContainer } from './styles';

interface IContentTable {
  type: string;
};

const ContentTable: React.FC<IContentTable> = ({ type }) => {
  const data = useSelector((state: IState) => type === 'incomes' ? state.incomes.incomes : state.expenses);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handlePageChange = (e: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

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
    <PaperContainer>
      <ContentTableContainer>
        <ContentTableHeader columns={columns} />
        <ContentTableBody 
          dataToRender={data} 
          page={page} 
          rowsPerPage={rowsPerPage} 
        />
      </ContentTableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        rowsPerPage={rowsPerPage}
        component='div'
        count={data.length}
        page={page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </PaperContainer>
  );
};

export default ContentTable;