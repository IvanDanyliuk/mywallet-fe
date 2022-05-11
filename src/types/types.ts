export interface IChart {
  data: {
    date: string;
    source?: string;
    amount: number;
    category?: string;
    merchant?: string;
    description: string;
    badgeColor: string;
  }[];
  dataKey: string;
  nameKey?: string;
};