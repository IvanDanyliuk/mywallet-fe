import React, { useState } from 'react';
import { 
  Section, 
  LanguageItem, 
  LanguageSelect, 
  SectionTitle 
} from './styles';

const Language: React.FC = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const handleLanguageChange = (e: any) => {
    setCurrentLanguage(e.target.value);
  };

  return (
    <Section>
      <SectionTitle variant='inherit'>Language</SectionTitle>
      <LanguageSelect value={currentLanguage} onChange={handleLanguageChange}>
        <LanguageItem value={'en'}>English</LanguageItem>
        <LanguageItem value={'ua'}>Ukrainian</LanguageItem>
      </LanguageSelect>
    </Section>
  );
};

export default Language;