import React, { 
  MouseEventHandler, 
  SyntheticEvent, 
  useEffect, 
  useState 
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { data } from '../../helpers/data';
import { createIncomeItem, updateIncomeItem } from '../../redux/incomes/asyncActions';
import { createExpenseItem, updateExpenseItem } from '../../redux/expenses/asyncActions';
import { AppDispatchType } from '../../redux/store';
import { generateColor } from '../../helpers/helpers';
import { IState } from '../../types/general';
import { 
  FormContainer, 
  FormOption, 
  FormSelect, 
  Input, 
  ModalBody, 
  ModalContent, 
  ModalFormTitle, 
  SubmitButton 
} from './styles';

interface ICreateIncomeFormModal {
  open: boolean;
  type: string;
  id?: string;
  onClose: MouseEventHandler;
};

const CreateIncomeFormModal: React.FC<ICreateIncomeFormModal> = ({ open, type, id, onClose }) => {
  const categories = type === 'incomes' 
    ? data.profile.categories.incomes : 
    data.profile.categories.expenses;

  const stateData = useSelector((state: IState) => type === 'incomes' 
    ? state.incomes.incomes : 
    state.expenses.expenses);
    
  const defaultCategoryValue = type === 'incomes' ? 'Regular' : 'All';

  const dispatch = useDispatch<AppDispatchType>();

  const [itemData, setItemData] = useState({
    title: '',
    amount: '',
    category: defaultCategoryValue,
    description: ''
  });

  const clear = () => {
    setItemData({
      title: '',
      amount: '',
      category: defaultCategoryValue,
      description: ''
    });
  };

  const handleChange = (e: any) => {
    setItemData({ ...itemData, [e.target.name]: e.target.value })
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if(!id) {
      type === 'incomes' ? 
        dispatch(createIncomeItem({ ...itemData, badgeColor: generateColor()})) : 
        dispatch(createExpenseItem({ ...itemData, badgeColor: generateColor()}));
      clear();
    } else {
      type === 'incomes' ? 
        dispatch(updateIncomeItem({ id, updatedIncome: {...itemData, badgeColor: generateColor()} })) :
        dispatch(updateExpenseItem({ id, updatedExpense: {...itemData, badgeColor: generateColor()} }));
    }
  };

  useEffect(() => {
    if(id) {
      const dataToUpdate = stateData.find(item => id === item._id) || itemData;
      setItemData({
        title: dataToUpdate.title,
        amount: dataToUpdate.amount,
        category: dataToUpdate.category,
        description: dataToUpdate.description
      });
    }
  }, [id]);

  return (
    <ModalBody open={open} onClose={onClose}>
      <ModalFormTitle>{type === 'incomes' ? 'Create Income' : 'Create Expense'}</ModalFormTitle>
      <ModalContent>
        <FormContainer onSubmit={handleSubmit}>
          <Input 
            required 
            id='title' 
            name='title' 
            label='Title' 
            value={itemData.title} 
            fullWidth 
            onChange={handleChange} 
          />
          <Input 
            required 
            id='amount' 
            name='amount' 
            label='Amount' 
            value={itemData.amount} 
            fullWidth 
            onChange={handleChange} 
          />
          <FormSelect 
            id='category' 
            label='Category' 
            name='category' 
            value={itemData.category} 
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
            value={itemData.description} 
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
  );
};

export default CreateIncomeFormModal;