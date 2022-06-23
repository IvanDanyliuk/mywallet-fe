import React, { 
  SyntheticEvent, 
  useEffect, 
  useState 
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { useTranslation } from 'react-i18next';
import { categories } from '../../../constants/constants';
import { createIncomeItem, updateIncomeItem } from '../../../redux/incomes/asyncActions';
import { createExpenseItem, updateExpenseItem } from '../../../redux/expenses/asyncActions';
import { AppDispatchType } from '../../../redux/store';
import { selectIncomes } from '../../../redux/incomes/selectors';
import { selectExpenses } from '../../../redux/expenses/selectors';
import { ICreateIncomeFormModal } from '../../../redux/general';
import { 
  CreationForm, 
  FormContainer, 
  FormItem, 
  FormOption, 
  FormSelect, 
  Input, 
  ModalBody, 
  ModalContent, 
  ModalFormTitle, 
  SubmitButton 
} from './styles';
import { selectUserId } from '../../../redux/user/selectors';


const CreateIncomeFormModal: React.FC<ICreateIncomeFormModal> = ({ open, type, id, onClose }) => {
  const { t } = useTranslation(['authForm']);
  const dispatch = useDispatch<AppDispatchType>();

  const userId = useSelector(selectUserId);
  
  const categoriesData = type === 'incomes' 
    ? categories.incomes : 
    categories.expenses;

  const stateData = useSelector(type === 'incomes' 
    ? selectIncomes : 
    selectExpenses);
    
  const defaultCategoryValue = type === 'incomes' ? t('authSelectDefaultIncome') : t('authSelectDefaultExpenses');

  const [itemData, setItemData] = useState({
    userId: userId!,
    title: '',
    amount: 0,
    category: defaultCategoryValue,
    badgeColor: '',
    description: ''
  });

  const clear = () => {
    setItemData({
      userId: userId!,
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
        userId: userId!,
        title: dataToUpdate.title,
        amount: dataToUpdate.amount,
        category: dataToUpdate.category,
        description: dataToUpdate.description
      });
    }
  }, [id]);

  return (
    <ModalBody open={open} onClose={onClose}>
      <ModalFormTitle>
        {type === 'incomes' ? t('authTitleIncomes') : t('authTitleExpense')}
      </ModalFormTitle>
      <ModalContent>
        <CreationForm onSubmit={handleSubmit}>
          <FormContainer container direction='column' spacing={2}>
            <FormItem item md={12}>
              <Input 
                data-testid='createFormInput'
                required 
                id='title' 
                name='title' 
                label={t('inputLabelTitle')} 
                value={itemData.title} 
                type='text'
                fullWidth 
                onChange={handleChange} 
              />
              </FormItem>
              <FormItem item md={12}>
                <Input 
                  data-testid='createFormInput'
                  required 
                  id='amount' 
                  name='amount' 
                  label={t('inputLabelAmount')} 
                  value={itemData.amount} 
                  fullWidth 
                  type='number'
                  onChange={handleChange} 
                />
              </FormItem>
              <FormItem item md={12}>
                <FormSelect 
                  data-testid='createFormInput'
                  id='category' 
                  label={t('inputLabelCategory')} 
                  name='category' 
                  value={itemData.category} 
                  onChange={handleChange} 
                  fullWidth
                >
                  {
                    categoriesData.map((category) => (
                      <FormOption key={uuid()} value={t(category)}>{t(category)}</FormOption>
                    ))
                  }
                </FormSelect>
              </FormItem>
              <FormItem item md={12}>
                <Input 
                  data-testid='createFormInput'
                  required 
                  id='description' 
                  name='description' 
                  label={t('inputLabelDescription')} 
                  value={itemData.description} 
                  // multiline 
                  type='text'
                  fullWidth 
                  
                  onChange={handleChange} 
                />
              </FormItem>
              <FormItem item md={12}>
                <SubmitButton 
                  color='primary' 
                  variant='contained' 
                  type='submit'
                >
                  {id ? t('updateBtn') : t('createBtn')}
                </SubmitButton>
              </FormItem>
          </FormContainer>
        </CreationForm>
      </ModalContent>
    </ModalBody>
  );
};

export default CreateIncomeFormModal;