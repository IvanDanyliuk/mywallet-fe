import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatchType } from '../../../redux/store';
import { setLanguage } from '../../../redux/user/asyncAction';
import { 
  Section, 
  LanguageItem, 
  LanguageSelect, 
  SectionTitle 
} from './styles';

const Language: React.FC = () => {
  const dispatch = useDispatch<AppDispatchType>();

  const user = JSON.parse(localStorage.getItem('profile') || '');
  const [currentLanguage, setCurrentLanguage] = useState(user.result.language);

  const handleLanguageChange = (e: any) => {
    e.preventDefault();
    setCurrentLanguage(e.target.value);
  };

  useEffect(() => {
    if(user.result.language !== currentLanguage) {
      dispatch(setLanguage({ 
        id: user.result._id, 
        language: currentLanguage 
      }));
      localStorage.setItem(
        'profile', 
        JSON.stringify({ 
          token: user.token, 
          result: { ...user.result, language: currentLanguage } 
        })
      );
    }
  }, [currentLanguage]);

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