import React, { MouseEventHandler, SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { data } from '../../helpers/data';
import { FormContainer, FormOption, FormSelect, Input, ModalBody, ModalContent, ModalFormTitle, SubmitButton } from './styles';
import { createIncomeItem, updateIncomeItem } from '../../redux/incomes/asyncActions';
import { AppDispatchType } from '../../redux/store';
import { generateColor } from '../../helpers/helpers';
import { useSelector } from 'react-redux';
import { IState } from '../../types/general';

interface ICreateIncomeFormModal {
  open: boolean;
  id?: string;
  onClose: MouseEventHandler;
};

const CreateIncomeFormModal: React.FC<ICreateIncomeFormModal> = ({ open, id, onClose }) => {
  const categories = data.profile.categories.incomes;
  const incomes = useSelector((state: IState) => state.incomes.incomes);
  
  const dispatch = useDispatch<AppDispatchType>();

  const [incomeData, setIncomeData] = useState({
    source: '',
    amount: '',
    category: 'Regular',
    description: ''
  });

  const clear = () => {
    setIncomeData({
      source: '',
      amount: '',
      category: 'Regular',
      description: ''
    });
  };

  const handleChange = (e: any) => {
    setIncomeData({ ...incomeData, [e.target.name]: e.target.value })
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if(!id) {
      dispatch(createIncomeItem({ ...incomeData, badgeColor: generateColor()}));
    } else {
      dispatch(updateIncomeItem({ id, updatedIncome: {...incomeData, badgeColor: generateColor()} }))
    }
    clear();
  }

  useEffect(() => {
    if(id !== '') {
      const incomeToUpdate = incomes.find(item => id === item._id) || incomeData;
      setIncomeData({
        source: incomeToUpdate.source,
        amount: incomeToUpdate.amount,
        category: incomeToUpdate.category,
        description: incomeToUpdate.description
      });
    }
  }, [id]);

  return (
    <ModalBody open={open} onClose={onClose}>
      <ModalFormTitle>Create Income</ModalFormTitle>
      <ModalContent>
        <FormContainer onSubmit={handleSubmit}>
          <Input 
            required 
            id='source' 
            name='source' 
            label='Source' 
            value={incomeData.source} 
            fullWidth 
            onChange={handleChange} 
          />
          <Input 
            required 
            id='amount' 
            name='amount' 
            label='Amount' 
            value={incomeData.amount} 
            fullWidth 
            onChange={handleChange} 
          />
          <FormSelect 
            id='category' 
            label='Category' 
            name='category' 
            value={incomeData.category} 
            onChange={handleChange} 
            fullWidth
          >
            {
              categories.map((category, i) => (
                <FormOption key={uuid()} value={category}>{category}</FormOption>
              ))
            }
          </FormSelect>
          <Input 
            required 
            id='description' 
            name='description' 
            label='Description' 
            value={incomeData.description} 
            multiline 
            fullWidth 
            onChange={handleChange} 
          />
          <SubmitButton color='primary' variant='contained' type='submit'>
            {id ? 'Update' : 'Create'}
          </SubmitButton>
        </FormContainer>
      </ModalContent>
    </ModalBody>
  )
}

export default CreateIncomeFormModal