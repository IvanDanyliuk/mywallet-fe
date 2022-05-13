import React, { FormEvent, useState } from 'react'
import { data } from '../../helpers/data';
import { DataGrid } from '@mui/x-data-grid';
import CreateBtn from '../../components/CreateButton/CreateButton';
import { Heading, MainContainer } from './styles';
import { PageTitle } from '../../layouts/styles';
import CreateIncomeFormModal from '../../components/Modals/CreateIncomeFormModal';

const Incomes: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const incomes = data.incomes;

  const columns = [
    {
      field: 'date',
      headerName: 'Date',
      width: 100
    },
    {
      field: 'source',
      headerName: 'Source',
      width: 400,
      editable: true,
    },
    {
      field: 'amount',
      headerName: 'Amount',
      width: 300,
      type: 'number',
      editable: true,
    },
    {
      field: 'category',
      headerName: 'Category',
      width: 300,
      editable: true,
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 500,
      editable: true,
      sortable: false,
    },
  ];
  const rows = data.incomes;

  const openCreateIncomeHandler = () => {
    setIsModalOpen(!isModalOpen);
    console.log('Modal is open now.')
  };

  const handleSubmitForm = (e: FormEvent) => {
    e.preventDefault();
    console.log('Form has been submitted');
    setIsModalOpen(false);
  }

  return (
    <>
      <CreateIncomeFormModal open={isModalOpen} onClose={openCreateIncomeHandler} onSubmit={handleSubmitForm} />
      <Heading>
        <PageTitle variant='inherit'>Incomes</PageTitle>
        <CreateBtn title='New income' clickHandler={openCreateIncomeHandler} />
      </Heading>
      <MainContainer>
        <DataGrid columns={columns} rows={rows} pageSize={10} rowsPerPageOptions={[10]} />
      </MainContainer>
    </>
  );
};

export default Incomes;