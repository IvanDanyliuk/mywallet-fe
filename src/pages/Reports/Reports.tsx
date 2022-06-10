import React from 'react';
import { useTranslation } from 'react-i18next';
import CreateReportModal from '../../components/Modals/CreateReportModal/CreateReportModal';
import ReportsTable from '../../components/ReportsTable/ReportsTable';
import { 
  Heading, 
  ReportsContainer, 
  ReportsContent, 
  ReportsTitle 
} from './styles';


const Reports: React.FC = () => {
  const { t } = useTranslation(['reports']);

  return (
    <ReportsContainer>
      <Heading>
        <ReportsTitle variant='inherit'>{t('pageHeading')}</ReportsTitle>
        <CreateReportModal />
      </Heading>
      <ReportsContent>
        <ReportsTable />
      </ReportsContent>
    </ReportsContainer>
  );
};

export default Reports;