import React, { useState } from 'react';
import { Section, LanguageItem, LanguageSelect, SectionTitle } from './styles';

const Language = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const handleLanguageChange = (e: any) => {
    setCurrentLanguage(e.target.value);
    console.log(currentLanguage);
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