import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { deleteIncomeItem, getIncomes } from '../../../redux/incomes/asyncActions';
import { AppDispatchType } from '../../../redux/store';
import { IState } from '../../../types/general';
import { ContentBody, ContentCell, ContentRow } from './styles';
import OptionsMenu from './RowMenu/OptionsMenu';
import CreateIncomeFormModal from '../../Modals/CreateIncomeFormModal';

const ContentTableBody: React.FC = () => {
  const dispatch = useDispatch<AppDispatchType>();
  const incomes = useSelector((state: IState) => state.incomes.incomes);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateIncomeId, setUpdateIncomeId] = useState('');


  const editIncomeHandler = (id: any) => {
    setIsModalOpen(true);
    setUpdateIncomeId(id);
  };

  const deleteIncomeHandler = (id: string) => {
    dispatch(deleteIncomeItem(id));
  };

  useEffect(() => {
    getIncomes();
  }, [dispatch, isModalOpen])

  return (
    <>
      <CreateIncomeFormModal open={isModalOpen} id={updateIncomeId} onClose={() => setIsModalOpen(false)} />
      <ContentBody>
        {
          incomes.map(income => (
            <ContentRow key={income._id}>
              <ContentCell>{moment(income.createdAt).format('MMM DD, YYYY')}</ContentCell>
              <ContentCell>{income.source}</ContentCell>
              <ContentCell>{income.amount}</ContentCell>
              <ContentCell>{income.category}</ContentCell>
              <ContentCell>{income.description}</ContentCell>
              <OptionsMenu id={income._id} onEdit={() => editIncomeHandler(income._id)} onDelete={() => deleteIncomeHandler(income._id)} />
            </ContentRow>
          ))
        }
      </ContentBody>
    </>
  )
}

export default ContentTableBody;