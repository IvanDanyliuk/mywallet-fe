import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatchType } from '../../../redux/store';import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField } from '@mui/material';
import { FormContainer, Input, ModalBody, ModalContent, ModalFormTitle, SubmitButton } from './styles';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { createReport } from '../../../redux/reports/asyncActions';

const CreateReportModal: React.FC = () => {
  // const { t } = useTranslation(['reports']);
  const [isOpen, setIsOpen] = useState(false);
  const handleModalClose = () => {
    setIsOpen(!isOpen);
  }

  const dispatch = useDispatch<AppDispatchType>();
  const user = useSelector((state: any) => state.user.user);
  const [reportData, setReportData] = useState({
    userId: user._id,
    heading: '',
    period: {
      from: '',
      to: '',
    },
    data: [
      {source: 'Source 1', amount: 1000}
    ],
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
    //@ts-ignore
    dispatch(createReport(reportData))
    handleModalClose();
  };

  useEffect(() => {
    
  }, []);

  return (
    <>
      <ModalBody 
        open={isOpen} 
        onClose={handleModalClose}
      >
        <ModalFormTitle>Create rport</ModalFormTitle>
        <ModalContent>
          <FormContainer onSubmit={handleSubmit}>
            <Input name='heading' onChange={handleChange} />
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker 
                label='From'
                data-name='from'
                value={reportData.period.from}
                //@ts-ignore
                onChange={(val) => setReportData({ ...reportData, period: { ...reportData.period, from: val._d } })}
                renderInput={(params) => <TextField { ...params } />}
              />
              <DatePicker 
                label='To'
                data-name='to'
                value={reportData.period.to}
                //@ts-ignore
                onChange={(val) => setReportData({ ...reportData, period: { ...reportData.period, to: val._d } })}
                renderInput={(params) => <TextField { ...params } />}
              />
            </LocalizationProvider>
            <Input name='comment' onChange={handleChange} />
            <SubmitButton 
              color='primary' 
              variant='contained' 
              type='submit'
            >
              Create
            </SubmitButton>
          </FormContainer>
        </ModalContent>
      </ModalBody>
      <Button onClick={handleModalClose}>Create report</Button>
    </>
  );
};

export default CreateReportModal;