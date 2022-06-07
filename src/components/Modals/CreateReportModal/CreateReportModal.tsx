import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatchType } from '../../../redux/store';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField } from '@mui/material';
import { CreateButton, FormContainer, Input, ModalBody, ModalContent, ModalFormTitle, SubmitButton } from './styles';
import { useTranslation } from 'react-i18next';
import { createReport, getReports } from '../../../redux/reports/asyncActions';
import { getIncomes } from '../../../redux/incomes/asyncActions';
import { getExpenses } from '../../../redux/expenses/asyncActions';

const CreateReportModal: React.FC = () => {
  const { t } = useTranslation(['reports']);
  const dispatch = useDispatch<AppDispatchType>();

  const incomes = useSelector((state: any) => state.incomes.incomes);
  const expenses = useSelector((state: any) => state.expenses.expenses);
  const user = useSelector((state: any) => state.user.user);

  const [isOpen, setIsOpen] = useState(false);
  const handleModalClose = () => {
    setIsOpen(!isOpen);
  };
 
  const [reportData, setReportData] = useState({
    userId: user._id,
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

  const handleChange = (e: any) => {
    setReportData({
      ...reportData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const filteredIncomes = incomes
      .filter((income: any) => (new Date(income.createdAt).toLocaleDateString() >= new Date(reportData.period.from).toLocaleDateString() && new Date(income.createdAt).toLocaleDateString() <= new Date(reportData.period.to).toLocaleDateString()))
      .map((income: any) => ({ source: income.title, amount: income.amount }));
    const filteredExpenses = expenses
      .filter((expense: any) => (new Date(expense.createdAt).toLocaleDateString() >= new Date(reportData.period.from).toLocaleDateString() && new Date(expense.createdAt).toLocaleDateString() <= new Date(reportData.period.to).toLocaleDateString()))
      .map((expense: any) => ({ source: expense.title, amount: expense.amount }));

    //@ts-ignore
    dispatch(createReport({ ...reportData, data: { incomes: filteredIncomes, expenses: filteredExpenses } }));
    handleModalClose();
  };

  useEffect(() => {
    dispatch(getIncomes(user._id));
    dispatch(getExpenses(user._id));
    dispatch(getReports(user._id));
  }, [dispatch]);

  return (
    <>
      <ModalBody 
        open={isOpen} 
        onClose={handleModalClose}
      >
        <ModalFormTitle>{t('modalFormTitle')}</ModalFormTitle>
        <ModalContent>
          <FormContainer onSubmit={handleSubmit}>
            <Input name='heading' label={t('modalFormLabelHeading')} onChange={handleChange} />
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker 
                label={t('modalFormLabelFrom')}
                data-name='from'
                value={reportData.period.from}
                //@ts-ignore
                onChange={(val) => setReportData({ ...reportData, period: { ...reportData.period, from: val._d } })}
                renderInput={(params) => <TextField { ...params } />}
              />
              <DatePicker 
                label={t('modalFormLabelTo')}
                data-name='to'
                value={reportData.period.to}
                //@ts-ignore
                onChange={(val) => setReportData({ ...reportData, period: { ...reportData.period, to: val._d } })}
                renderInput={(params) => <TextField { ...params } />}
              />
            </LocalizationProvider>
            <Input name='comment' label={t('modalFormLabelComment')} onChange={handleChange} />
            <SubmitButton 
              color='primary' 
              variant='contained' 
              type='submit'
            >
              {t('modalFormSubmitBtn')}
            </SubmitButton>
          </FormContainer>
        </ModalContent>
      </ModalBody>
      <CreateButton variant='contained' color='success' onClick={handleModalClose}>{t('modalFormOpenBtn')}</CreateButton>
    </>
  );
};

export default CreateReportModal;