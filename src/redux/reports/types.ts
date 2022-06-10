export interface IReportState {
  reports: IReports[];
  openedReport: IReportData | null;
  status: string;
  error: null | string;
};

export interface IReports {
  userId: string,
  heading: string,
  period: {
    from: string,
    to: string,
  },
  data: {
    incomes: [],
    expenses: [],
  },
  comment: string,
  createdAt: string;
  _id: string;
};

export interface IReportData {
  userId: any,
  heading: string,
  period: {
    from: string,
    to: string,
  },
  data: {
    incomes: { source: string; amount: any; badgeColor: string; }[],
    expenses: { source: string; amount: any; badgeColor: string; }[],
  },
  comment: string,
};

export interface IReportToUpdate {
  id: string | undefined;
  updatedReport: IReportData;
};
