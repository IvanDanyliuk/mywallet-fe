import React, { ChangeEvent, useState } from 'react'
import { useSelector } from 'react-redux';
import { TablePagination } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { IContentTable } from '../../redux/general';
import ContentTableHeader from './ContentTableHeader/ContentTableHeader';
import ContentTableBody from './ContentTableBody/ContentTableBody';
import { selectIncomes } from '../../redux/incomes/selectors';
import { selectExpenses } from '../../redux/expenses/selectors';
import { ContentTableContainer, PaperContainer } from './styles';


const ContentTable: React.FC<IContentTable> = ({ type }) => {
  const { t } = useTranslation(['contentTable']);
  const data = useSelector(type === 'incomes' ? selectIncomes : selectExpenses);
  
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
      label: t('headerColDate'),
      isSortable: true,
    },
    {
      sortKey: 'source',
      label: t('headerColSource'),
      isSortable: true,
    },
    {
      sortKey: 'amount',
      label: t('headerColAmount'),
      isSortable: true,
    },
    {
      sortKey: 'category',
      label: t('headerColCategory'),
      isSortable: false,
    },
    {
      sortKey: 'description',
      label: t('headerColDescription'),
      isSortable: false,
    },
  ];

  return (
    <PaperContainer>
      <ContentTableContainer>
        <ContentTableHeader columns={columns} />
        <ContentTableBody 
          dataToRender={data} 
          type={type}
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