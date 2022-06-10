import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import ContentTable from '../../components/ContentTable/ContentTable';
import CreateButton from '../../components/CreateButton/CreateButton';
import CreateFormModal from '../../components/Modals/CreateFormModal/CreateFormModal';
import { getExpenses } from '../../redux/expenses/asyncActions';
import { AppDispatchType } from '../../redux/store';
import { selectUserId } from '../../redux/user/selectors';
import { FormModalType, DataType } from '../../redux/general';
import { MainContainer } from '../../components/Navigation/styles';
import { PageTitle } from '../../layouts/styles';
import { Heading } from './styles';


const Expenses: React.FC = () => {
  const { t } = useTranslation(['expenses']);
  const dispatch = useDispatch<AppDispatchType>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const userId = useSelector(selectUserId);

  const openCreateExpenseHandler = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    dispatch(getExpenses(userId!));
  }, [dispatch]);

  return (
    <>
      <CreateFormModal 
        type={FormModalType.Expenses} 
        open={isModalOpen} 
        onClose={openCreateExpenseHandler} 
      />
      <Heading>
        <PageTitle variant='inherit'>{t('pageHeading')}</PageTitle>
        <CreateButton 
          title={t('createBtnTitle')} 
          clickHandler={openCreateExpenseHandler} 
        />
      </Heading>
      <MainContainer>
        <ContentTable type={DataType.Expenses} />
      </MainContainer>
    </>
  );
};

export default Expenses;