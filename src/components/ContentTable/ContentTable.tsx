import { TablePagination } from '@mui/material';
import React, { ChangeEvent, useState } from 'react'
import { useSelector } from 'react-redux';
import { IState } from '../../types/general';
import ContentTableBody from './ContentTableBody/ContentTableBody'
import ContentTableHeader from './ContentTableHeader/ContentTableHeader'
import { ContentTableContainer, PaperContainer } from './styles'

const ContentTable = () => {
  const incomes = useSelector((state: IState) => state.incomes.incomes);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handlePageChange = (e: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  return (
    <PaperContainer>
      <ContentTableContainer>
        <ContentTableHeader type='incomes' />
        <ContentTableBody 
          dataToRender={incomes} 
          page={page} 
          rowsPerPage={rowsPerPage} 
        />
      </ContentTableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        rowsPerPage={rowsPerPage}
        component='div'
        count={incomes.length}
        page={page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </PaperContainer>
  );
};

export default ContentTable;