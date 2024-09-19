export interface Job {
  company: string;
  city: string;
  country: string;
  role: string;
  responsabilities: string;
  period: {
    startMonth: string;
    startYear: string;
    endMonth: string;
    endYear: string;
  };
}
