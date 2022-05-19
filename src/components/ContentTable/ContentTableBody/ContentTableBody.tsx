import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { deleteIncomeItem, getIncomes } from '../../../redux/incomes/asyncActions';
import { AppDispatchType } from '../../../redux/store';
import { IState } from '../../../types/types';
import { ContentBody, ContentCell, ContentRow } from './styles';
import OptionsMenu from './RowMenu/OptionsMenu';

const ContentTableBody: React.FC = () => {
  const dispatch = useDispatch<AppDispatchType>();
  const incomes = useSelector((state: IState) => state.incomes.incomes);

  const editIncomeHandler = (id: any) => {
    
  };

  const deleteIncomeHandler = (id: string) => {
    dispatch(deleteIncomeItem(id));
  };

  useEffect(() => {
    getIncomes();
  }, [dispatch])

  return (
    <ContentBody>
      {
        incomes.map(income => (
          <ContentRow key={income._id}>
            <ContentCell>{moment(income.createdAt).format('MMM DD, YYYY')}</ContentCell>
            <ContentCell>{income.source}</ContentCell>
            <ContentCell>{income.amount}</ContentCell>
            <ContentCell>{income.category}</ContentCell>
            <ContentCell>{income.description}</ContentCell>
            <OptionsMenu id={income._id} onEdit={editIncomeHandler} onDelete={() => deleteIncomeHandler(income._id)} />
          </ContentRow>
        ))
      }
    </ContentBody>
  )
}

export default ContentTableBody;