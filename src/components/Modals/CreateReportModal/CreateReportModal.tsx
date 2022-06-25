import React, { SyntheticEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatchType } from '../../../redux/store';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { createReport, getReports } from '../../../redux/reports/asyncActions';
import { getIncomes } from '../../../redux/incomes/asyncActions';
import { getExpenses } from '../../../redux/expenses/asyncActions';
import { setColor } from '../../../helpers/helpers';
import { selectIncomes } from '../../../redux/incomes/selectors';
import { selectExpenses } from '../../../redux/expenses/selectors';
import { selectUserId } from '../../../redux/user/selectors';
import { IIncome } from '../../../redux/incomes/types';
import { IExpense } from '../../../redux/expenses/types';
import { 
  CreateButton, 
  CreationForm, 
  FormContainer, 
  FormItem, 
  Input, 
  ModalBody, 
  ModalContent, 
  ModalFormTitle, 
  SubmitButton 
} from './styles';


const CreateReportModal: React.FC = () => {
  const { t } = useTranslation(['reports']);
  const dispatch = useDispatch<AppDispatchType>();

  const incomes = useSelector(selectIncomes);
  const expenses = useSelector(selectExpenses);
  const userId = useSelector(selectUserId);

  const [isOpen, setIsOpen] = useState(false);
  const [reportData, setReportData] = useState({
    userId: userId,
    heading: '',
    period: {
      from: '',
      to: '',
    },
    data: {
      incomes: [],
      expenses: [],
    },
    comment: '',
  });

  const handleModalClose = () => {
    setIsOpen(!isOpen);
  };

  const handleChange = (e: any) => {
    setReportData({
      ...reportData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    const filteredIncomes = incomes
      .filter((income: IIncome) => (new Date(income.createdAt).toLocaleDateString() >= new Date(reportData.period.from).toLocaleDateString() && new Date(income.createdAt).toLocaleDateString() <= new Date(reportData.period.to).toLocaleDateString()))
      .map((income: IIncome) => ({ source: income.title, amount: income.amount, badgeColor: setColor() }));
    const filteredExpenses = expenses
      .filter((expense: IExpense) => (new Date(expense.createdAt).toLocaleDateString() >= new Date(reportData.period.from).toLocaleDateString() && new Date(expense.createdAt).toLocaleDateString() <= new Date(reportData.period.to).toLocaleDateString()))
      .map((expense: IExpense) => ({ source: expense.title, amount: expense.amount, badgeColor: setColor() }));
    
    dispatch(createReport({ ...reportData, data: { incomes: filteredIncomes, expenses: filteredExpenses } }));

    handleModalClose();
  };

  useEffect(() => {
    dispatch(getIncomes(userId!));
    dispatch(getExpenses(userId!));
    dispatch(getReports(userId!));
  }, [dispatch]);

  return (
    <>
      <ModalBody 
        open={isOpen} 
        onClose={handleModalClose}
      >
        <ModalFormTitle>{t('modalFormTitle')}</ModalFormTitle>
        <ModalContent>
          <CreationForm onSubmit={handleSubmit}>
            <FormContainer container direction='column' spacing={2}>
              <FormItem item md={12}>
                <Input 
                  data-testid='formInput'
                  name='heading' 
                  label={t('modalFormLabelHeading')} 
                  type='text'
                  required
                  onChange={handleChange} 
                />
              </FormItem>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <FormItem item md={12}>
                  <DatePicker 
                    data-testid='formInput'
                    label={t('modalFormLabelFrom')}
                    data-name='from'
                    value={reportData.period.from}
                    onChange={(val: any) => setReportData({ ...reportData, period: { ...reportData.period, from: val._d! } })}
                    renderInput={(params) => <TextField { ...params } />}
                  />
                </FormItem>
                <FormItem item md={12}>
                  <DatePicker 
                    data-testid='formInput'
                    label={t('modalFormLabelTo')}
                    data-name='to'
                    value={reportData.period.to}
                    onChange={(val: any) => setReportData({ ...reportData, period: { ...reportData.period, to: val._d } })}
                    renderInput={(params) => <TextField { ...params } />}
                  />
                </FormItem>
              </LocalizationProvider>
              <FormItem item md={12}>
                <Input 
                  data-testid='formInput'
                  name='comment' 
                  label={t('modalFormLabelComment')} 
                  type='text'
                  onChange={handleChange} 
                />
              </FormItem>
              <FormItem item md={12}>
                <SubmitButton 
                  color='primary' 
                  variant='contained' 
                  type='submit'
                >
                  {t('modalFormSubmitBtn')}
                </SubmitButton>
              </FormItem>
            </FormContainer>
          </CreationForm>
        </ModalContent>
      </ModalBody>
      <CreateButton 
        variant='contained' 
        color='success' 
        onClick={handleModalClose}
      >
        {t('modalFormOpenBtn')}
      </CreateButton>
    </>
  );
};

export default CreateReportModal;