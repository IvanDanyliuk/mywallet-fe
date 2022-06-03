import React, { 
  MouseEventHandler, 
  SyntheticEvent, 
  useEffect, 
  useState 
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { data } from '../../../helpers/data';
import { createIncomeItem, updateIncomeItem } from '../../../redux/incomes/asyncActions';
import { createExpenseItem, updateExpenseItem } from '../../../redux/expenses/asyncActions';
import { AppDispatchType } from '../../../redux/store';
import { IState } from '../../../types/general';
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
import { useTranslation } from 'react-i18next';

interface ICreateIncomeFormModal {
  open: boolean;
  type: string;
  id?: string;
  onClose: MouseEventHandler;
};

const CreateIncomeFormModal: React.FC<ICreateIncomeFormModal> = ({ open, type, id, onClose }) => {
  const { t } = useTranslation(['authForm']);
  
  const categories = type === 'incomes' 
    ? data.profile.categories.incomes : 
    data.profile.categories.expenses;

  const stateData = useSelector((state: IState) => type === 'incomes' 
    ? state.incomes.incomes : 
    state.expenses.expenses);
    
  const defaultCategoryValue = type === 'incomes' ? t('authSelectDefaultIncome') : t('authSelectDefaultExpenses');

  const dispatch = useDispatch<AppDispatchType>();

  const [itemData, setItemData] = useState({
    userId: JSON.parse(localStorage.getItem('profile') || '').result._id,
    title: '',
    amount: '',
    category: defaultCategoryValue,
    description: ''
  });

  console.log(defaultCategoryValue)

  const clear = () => {
    setItemData({
      userId: JSON.parse(localStorage.getItem('profile') || '').result._id,
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
        dispatch(createIncomeItem(itemData)) : 
        dispatch(createExpenseItem(itemData));
      clear();
    } else {
      type === 'incomes' ? 
        dispatch(updateIncomeItem({ id, updatedIncome: itemData })) :
        dispatch(updateExpenseItem({ id, updatedExpense: itemData }));
    }
  };

  useEffect(() => {
    if(id) {
      const dataToUpdate = stateData.find(item => id === item._id) || itemData;
      setItemData({
        //@ts-ignore
        userId: JSON.parse(localStorage.getItem('profile')).result._id,
        title: dataToUpdate.title,
        amount: dataToUpdate.amount,
        category: dataToUpdate.category,
        description: dataToUpdate.description
      });
    }
  }, [id]);

  return (
    <ModalBody open={open} onClose={onClose}>
      <ModalFormTitle>{type === 'incomes' ? t('authTitleIncomes') : t('authTitleExpense')}</ModalFormTitle>
      <ModalContent>
        <FormContainer onSubmit={handleSubmit}>
          <Input 
            required 
            id='title' 
            name='title' 
            label={t('inputLabelTitle')} 
            value={itemData.title} 
            fullWidth 
            onChange={handleChange} 
          />
          <Input 
            required 
            id='amount' 
            name='amount' 
            label={t('inputLabelAmount')} 
            value={itemData.amount} 
            fullWidth 
            onChange={handleChange} 
          />
          <FormSelect 
            id='category' 
            label={t('inputLabelCategory')} 
            name='category' 
            value={itemData.category} 
            onChange={handleChange} 
            fullWidth
          >
            {
              categories.map((category, i) => (
                <FormOption key={uuid()} value={t(category)}>{t(category)}</FormOption>
              ))
            }
          </FormSelect>
          <Input 
            required 
            id='description' 
            name='description' 
            label={t('inputLabelDescription')} 
            value={itemData.description} 
            multiline 
            fullWidth 
            
            onChange={handleChange} 
          />
          <SubmitButton 
            color='primary' 
            variant='contained' 
            type='submit'
          >
            {id ? t('updateBtn') : t('createBtn')}
          </SubmitButton>
        </FormContainer>
      </ModalContent>
    </ModalBody>
  );
};

export default CreateIncomeFormModal;