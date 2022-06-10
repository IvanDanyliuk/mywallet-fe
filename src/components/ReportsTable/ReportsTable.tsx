import React, { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch,  useSelector } from 'react-redux';
import moment from 'moment';
import { v4 as uuid } from 'uuid';
import { useTranslation } from 'react-i18next';
import { deleteReport, getReports } from '../../redux/reports/asyncActions';
import { sortReports } from '../../redux/reports/reducers';
import { AppDispatchType } from '../../redux/store';
import OptionsMenu from '../ContentTable/ContentTableBody/RowMenu/OptionsMenu';
import { TablePagination } from '@mui/material';
import { 
  HeaderCell, 
  HeaderRow, 
  PaperContainer, 
  ReportTableContainer, 
  ReportsHeader, 
  SortLabel, 
  ReportsBody, 
  ContentRow, 
  ContentCell 
} from './styles';
import { OptionsMenuType, TableSortOrder } from '../../redux/general';



const ReportsTable: React.FC = () => {
  const { t } = useTranslation(['reports']);
  const dispatch = useDispatch<AppDispatchType>();
  let navigate = useNavigate();
  
  const reports = useSelector((state: any) => state.reports.reports);
  const user = useSelector((state: any) => state.user.user);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState(TableSortOrder.desc);
  

  const handleSort = () => {
    if(order === 'asc') {
      setOrder(TableSortOrder.desc);
      dispatch(sortReports(order));
    };
    if(order === 'desc') {
      setOrder(TableSortOrder.asc);
      dispatch(sortReports(order));
    };
  };

  const openReportHandler = (id: any) => {
    navigate(`/reports/${id}`);
  }

  const deleteReportHandler = (id: string) => {
    dispatch(deleteReport(id));
  };

  const handlePageChange = (e: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const emptyRows = page >= 0 
    ? Math.max(0, (page + 1)) * rowsPerPage - reports.length : 0;

  const columns = [
    {
      sortKey: 'createdAt',
      label: t('tableHeaderColDate'),
      isSortable: true,
    },
    {
      sortKey: 'heading',
      label: t('tableHeaderColTitle'),
      isSortable: false,
    },
    {
      sortKey: 'period',
      label: t('tableHeaderColPeriod'),
      isSortable: false,
    },
    {
      sortKey: 'comment',
      label: t('tableHeaderColComment'),
      isSortable: false,
    },
  ];

  useEffect(() => {
    dispatch(getReports(user._id));
  }, [dispatch, navigate]);

  return (
    <PaperContainer>
      <ReportTableContainer>
        <ReportsHeader>
          <HeaderRow>
            {
              columns.map(column => (
                <HeaderCell key={uuid()} datatype={column.sortKey}>
                  {
                    column.isSortable ? (
                      <SortLabel
                        active
                        direction={order}
                        onClick={() => handleSort()}
                      >
                        {column.label}
                      </SortLabel>
                    ) : (
                      column.label
                    )
                  }
                </HeaderCell>
              ))
            }
          </HeaderRow>
        </ReportsHeader>
        <ReportsBody>
          {
            reports.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item: any) => (
              <ContentRow key={uuid()}>
                <ContentCell datatype='createdAt'>{moment(item.createdAt).format('MMM DD, YYYY')}</ContentCell>
                <ContentCell datatype='heading'>{item.heading}</ContentCell>
                <ContentCell datatype='period'>{`${moment(item.period.from).format('MMM DD, YYYY')} - ${moment(item.period.to).format('MMM DD, YYYY')}`}</ContentCell>
                <ContentCell datatype='comment'>{item.comment}</ContentCell>
                <OptionsMenu id={item._id} type={OptionsMenuType.Reports} onOpen={() => openReportHandler(item._id)} onDelete={() => deleteReportHandler(item._id)} />
              </ContentRow>
            ))
          }
          {emptyRows > 0 && (
            <ContentRow style={{ height: 53 * emptyRows }}>
              <ContentCell />
            </ContentRow>
          )}
        </ReportsBody>
      </ReportTableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        rowsPerPage={rowsPerPage}
        component='div'
        count={reports.length}
        page={page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </PaperContainer>
  );
};

export default ReportsTable;