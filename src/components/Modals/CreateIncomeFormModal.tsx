import React, { MouseEventHandler, SyntheticEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { data } from '../../helpers/data';
import { FormContainer, FormOption, FormSelect, Input, ModalBody, ModalContent, ModalFormTitle, SubmitButton } from './styles';
import { createIncomeItem } from '../../redux/incomes/asyncActions';
import { AppDispatchType } from '../../redux/store';
import { generateColor } from '../../helpers/helpers';

interface ICreateIncomeFormModal {
  open: boolean;
  onClose: MouseEventHandler;
}

const CreateIncomeFormModal: React.FC<ICreateIncomeFormModal> = ({ open, onClose }) => {
  const categories = data.profile.categories.incomes;
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
    })
  };

  const handleChange = (e: any) => {
    setIncomeData({ ...incomeData, [e.target.name]: e.target.value })
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(createIncomeItem({ ...incomeData, badgeColor: generateColor()}));
    clear();
  }

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
          <SubmitButton color='primary' variant='contained' type='submit'>Create</SubmitButton>
        </FormContainer>
      </ModalContent>
    </ModalBody>
  )
}

export default CreateIncomeFormModal