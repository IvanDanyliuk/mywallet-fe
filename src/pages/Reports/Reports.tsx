import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';
import CreateReportModal from '../../components/Modals/CreateReportModal/CreateReportModal';
import { 
  ReportFilter, 
  ReportsContainer, 
  ReportsContent, 
  ReportSection, 
  ReportsHeading 
} from './styles';

const Reports: React.FC = () => {
  const { t } = useTranslation(['reports']);

  return (
    <ReportsContainer>
      <ReportsHeading>{t('pageHeading')}</ReportsHeading>
      <ReportsContent>
        <ReportFilter>
          <CreateReportModal />
          
        </ReportFilter>
        <ReportSection></ReportSection>
        <ReportSection></ReportSection>
      </ReportsContent>
    </ReportsContainer>
  );
};

export default Reports;