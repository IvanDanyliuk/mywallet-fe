import React from 'react'
import { useTranslation } from 'react-i18next';

const Reports: React.FC = () => {
  const { t } = useTranslation(['reports']);
  return (
    <div>{t('pageHeading')}</div>
  );
};

export default Reports;