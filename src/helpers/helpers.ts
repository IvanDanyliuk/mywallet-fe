import { useLocation } from "react-router-dom"

export const getPageTitleFromUrl = (urlData: string): string => {
  if(urlData === '/') return 'Dashboard';
  const title = urlData.split('/')[1];
  return title[0].toUpperCase() + title.slice(1);
}