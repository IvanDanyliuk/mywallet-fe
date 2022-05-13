import { Grid } from '@mui/material';
import React, { FormEventHandler, MouseEventHandler } from 'react';
import { data } from '../../helpers/data';
import { FormContainer, FormOption, FormSelect, Input, ModalBody, ModalContent, ModalFormTitle, SubmitButton } from './styles';

interface ICreateIncomeFormModal {
  open: boolean;
  onClose: MouseEventHandler;
  onSubmit: FormEventHandler;
}

const CreateIncomeFormModal: React.FC<ICreateIncomeFormModal> = ({ open, onClose, onSubmit }) => {
  const categories = data.profile.categories.incomes;

  return (
    <ModalBody open={open} onClose={onClose}>
      <ModalFormTitle>Create Income</ModalFormTitle>
      <ModalContent>
        <FormContainer onSubmit={onSubmit}>
          <Input required id='source' label='Source' fullWidth />
          <Input required id='amount' label='Source' fullWidth />
          <FormSelect label='Category' onChange={() => {}} defaultValue='Regular' fullWidth>
            {
              categories.map((category, i) => (
                <FormOption key={`Option_${i}`} value={category}>{category}</FormOption>
              ))
            }
          </FormSelect>
          <Input required id='description' label='Description' multiline fullWidth />
          <SubmitButton color='primary' variant='contained' type='submit'>Create</SubmitButton>
        </FormContainer>
      </ModalContent>
    </ModalBody>
  )
}

export default CreateIncomeFormModal