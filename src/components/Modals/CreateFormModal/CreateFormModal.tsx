import React, { 
  SyntheticEvent, 
  useEffect, 
  useState 
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { useTranslation } from 'react-i18next';
import { data } from '../../../helpers/data';
import { createIncomeItem, updateIncomeItem } from '../../../redux/incomes/asyncActions';
import { createExpenseItem, updateExpenseItem } from '../../../redux/expenses/asyncActions';
import { AppDispatchType } from '../../../redux/store';
import { selectIncomes } from '../../../redux/incomes/selectors';
import { selectExpenses } from '../../../redux/expenses/selectors';
import { ICreateIncomeFormModal } from '../../../redux/general';
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


const CreateIncomeFormModal: React.FC<ICreateIncomeFormModal> = ({ open, type, id, onClose }) => {
  const { t } = useTranslation(['authForm']);
  const dispatch = useDispatch<AppDispatchType>();
  
  const categories = type === 'incomes' 
    ? data.profile.categories.incomes : 
    data.profile.categories.expenses;

  const stateData = useSelector(type === 'incomes' 
    ? selectIncomes : 
    selectExpenses);
    
  const defaultCategoryValue = type === 'incomes' ? t('authSelectDefaultIncome') : t('authSelectDefaultExpenses');

  const [itemData, setItemData] = useState({
    userId: JSON.parse(localStorage.getItem('profile') || '').result._id,
    title: '',
    amount: 0,
    category: defaultCategoryValue,
    badgeColor: '',
    description: ''
  });

  const clear = () => {
    setItemData({
      userId: JSON.parse(localStorage.getItem('profile') || '').result._id,
      title: '',
      amount: 0,
      category: defaultCategoryValue,
      badgeColor: '',
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
        ...itemData,
        userId: JSON.parse(localStorage.getItem('profile') || '').result._id,
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
              categories.map((category) => (
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