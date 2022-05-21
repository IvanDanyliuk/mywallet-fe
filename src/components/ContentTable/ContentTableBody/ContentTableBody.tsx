import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import moment from 'moment';
import { v4 as uuid } from 'uuid';
import { deleteIncomeItem, getIncomes } from '../../../redux/incomes/asyncActions';
import { AppDispatchType } from '../../../redux/store';
import { ContentBody, ContentCell, ContentRow } from './styles';
import OptionsMenu from './RowMenu/OptionsMenu';
import CreateIncomeFormModal from '../../Modals/CreateIncomeFormModal';
import { IIncomes } from '../../../redux/incomes/types';

interface ITableData {
  dataToRender: IIncomes[];
  page: number;
  rowsPerPage: number;
}

const ContentTableBody: React.FC<ITableData> = ({ dataToRender, page, rowsPerPage }) => {
  const dispatch = useDispatch<AppDispatchType>();
  // const incomes = useSelector((state: IState) => state.incomes.incomes);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateIncomeId, setUpdateIncomeId] = useState('');

  const editIncomeHandler = (id: any) => {
    setIsModalOpen(true);
    setUpdateIncomeId(id);
  };

  const deleteIncomeHandler = (id: string) => {
    dispatch(deleteIncomeItem(id));
  };

  const emptyRows = page > 0 ? Math.max(0, (page + 1)) * rowsPerPage - dataToRender.length : 0;

  useEffect(() => {
    getIncomes();
  }, [dispatch, isModalOpen]);

  return (
    <>
      <CreateIncomeFormModal open={isModalOpen} id={updateIncomeId} onClose={() => setIsModalOpen(false)} />
      <ContentBody>
        {
          dataToRender.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(income => (
            <ContentRow key={uuid()}>
              <ContentCell>{moment(income.createdAt).format('MMM DD, YYYY')}</ContentCell>
              <ContentCell>{income.source}</ContentCell>
              <ContentCell>{income.amount}</ContentCell>
              <ContentCell>{income.category}</ContentCell>
              <ContentCell>{income.description}</ContentCell>
              <OptionsMenu id={income._id} onEdit={() => editIncomeHandler(income._id)} onDelete={() => deleteIncomeHandler(income._id)} />
            </ContentRow>
          ))
        }
        {emptyRows > 0 && (
          <ContentRow style={{ height: 53 * emptyRows }}>
            <ContentCell  />
          </ContentRow>
        )}
      </ContentBody>
    </>
  )
}

export default ContentTableBody;