import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { v4 as uuid } from 'uuid';
import { deleteIncomeItem, getIncomes } from '../../../redux/incomes/asyncActions';
import { deleteExpenseItem, getExpenses } from '../../../redux/expenses/asyncActions';
import { AppDispatchType } from '../../../redux/store';
import OptionsMenu from './RowMenu/OptionsMenu';
import CreateFormModal from '../../Modals/CreateFormModal/CreateFormModal';
import { getCurrencyIcon } from '../../../helpers/helpers';
import { ITableData, OptionsMenuType, DataType } from '../../../redux/general';
import { selectCurrency, selectUserId } from '../../../redux/user/selectors';
import { ContentBody, ContentCell, ContentRow } from './styles';
import { useTranslation } from 'react-i18next';


const ContentTableBody: React.FC<ITableData> = ({ type, dataToRender, page, rowsPerPage }) => {
  const { t } = useTranslation(['contentTable']);
  const dispatch = useDispatch<AppDispatchType>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateItemId, setUpdateItemId] = useState('');

  const userId = useSelector(selectUserId);
  const currency = useSelector(selectCurrency);

  const currencyIcon = getCurrencyIcon(currency!);

  const editItemHandler = (id: any) => {
    setIsModalOpen(true);
    setUpdateItemId(id);
  };

  const deleteItemHandler = (id: string) => {
    type === DataType.Incomes ? 
      dispatch(deleteIncomeItem(id)) : 
      dispatch(deleteExpenseItem(id));
  };

  const emptyRows = page > 0 
    ? Math.max(0, (page + 1)) * rowsPerPage - dataToRender.length : 0;

  useEffect(() => {
    type === DataType.Incomes ? 
      getIncomes(userId!) : 
      getExpenses(userId!);
  }, [dispatch, isModalOpen]);

  return (
    <>
      <CreateFormModal 
        open={isModalOpen} 
        type={type} 
        id={updateItemId} 
        onClose={() => setIsModalOpen(false)} 
      />
      <ContentBody>
        {
          dataToRender.length ?
            dataToRender.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(item => (
              <ContentRow key={uuid()} data-testid='tableRow'>
                <ContentCell>{moment(item.createdAt).format('MMM DD, YYYY')}</ContentCell>
                <ContentCell>{item.title}</ContentCell>
                <ContentCell>{currencyIcon}{item.amount}</ContentCell>
                <ContentCell>{item.category}</ContentCell>
                <ContentCell>{item.description}</ContentCell>
                <ContentCell>
                  <OptionsMenu 
                    id={item._id} 
                    type={OptionsMenuType.Content}
                    onEdit={() => editItemHandler(item._id)} 
                    onDelete={() => deleteItemHandler(item._id)} 
                  />
                </ContentCell>
              </ContentRow>
            )) : (
              <ContentRow style={{ height: 53 * 5 }}>
                <ContentCell colSpan={12} style={{textAlign: 'center'}}>
                  {t('noDataMessage')}
                </ContentCell>
              </ContentRow>
            )
        }
        {emptyRows > 0 && (
          <ContentRow style={{ height: 53 * emptyRows }}>
            <ContentCell data-testid='emptyRow'  />
          </ContentRow>
        )}
      </ContentBody>
    </>
  );
};

export default ContentTableBody;