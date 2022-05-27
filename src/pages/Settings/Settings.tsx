import React from 'react';
import Currency from './Currency/Currency';
import Language from './Language/Language';
import Profile from './Profile/Profile';
import { SettingsContainer, SettingSection } from './styles';

const Settings: React.FC = () => {
  return (
    <SettingsContainer 
      container 
      wrap='nowrap' 
      spacing={2} 
      direction='column'
    >
      <SettingSection item>
        <Profile />
      </SettingSection>
      <SettingSection item>
        <Language />
      </SettingSection>
      <SettingSection item>
        <Currency />
      </SettingSection>
    </SettingsContainer>
  );
};

export default Settings;