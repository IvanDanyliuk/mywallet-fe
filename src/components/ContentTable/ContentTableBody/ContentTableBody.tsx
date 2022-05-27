import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { v4 as uuid } from 'uuid';
import { deleteIncomeItem, getIncomes } from '../../../redux/incomes/asyncActions';
import { deleteExpenseItem, getExpenses } from '../../../redux/expenses/asyncActions';
import { AppDispatchType } from '../../../redux/store';
import OptionsMenu from './RowMenu/OptionsMenu';
import CreateIncomeFormModal from '../../Modals/CreateFormModal';
import { IIncomes } from '../../../redux/incomes/types';
import { IExpenses } from '../../../redux/expenses/types';
import { ContentBody, ContentCell, ContentRow } from './styles';

interface ITableData {
  type: string;
  dataToRender: IIncomes[] | IExpenses[];
  page: number;
  rowsPerPage: number;
};

const ContentTableBody: React.FC<ITableData> = ({ type, dataToRender, page, rowsPerPage }) => {
  const dispatch = useDispatch<AppDispatchType>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateItemId, setUpdateItemId] = useState('');

  const editItemHandler = (id: any) => {
    setIsModalOpen(true);
    setUpdateItemId(id);
  };

  const deleteItemHandler = (id: string) => {
    type === 'incomes' ? 
      dispatch(deleteIncomeItem(id)) : 
      dispatch(deleteExpenseItem(id));
  };

  const emptyRows = page > 0 
    ? Math.max(0, (page + 1)) * rowsPerPage - dataToRender.length : 0;

  useEffect(() => {
    type === 'incomes' ? 
      getIncomes() : 
      getExpenses();
  }, [dispatch, isModalOpen]);

  return (
    <>
      <CreateIncomeFormModal 
        open={isModalOpen} 
        type={type} 
        id={updateItemId} 
        onClose={() => setIsModalOpen(false)} 
      />
      <ContentBody>
        {
          dataToRender.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(item => (
            <ContentRow key={uuid()}>
              <ContentCell>{moment(item.createdAt).format('MMM DD, YYYY')}</ContentCell>
              <ContentCell>{item.title}</ContentCell>
              <ContentCell>{item.amount}</ContentCell>
              <ContentCell>{item.category}</ContentCell>
              <ContentCell>{item.description}</ContentCell>
              <OptionsMenu 
                id={item._id} 
                onEdit={() => editItemHandler(item._id)} 
                onDelete={() => deleteItemHandler(item._id)} 
              />
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
  );
};

export default ContentTableBody;