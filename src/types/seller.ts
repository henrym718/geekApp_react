export interface Job {
  company: string;
  city: string;
  country: string;
  role: string;
  responsabilities: string;
  period: {
    startMonth: string | number;
    startYear: string | number;
    endMonth?: string | number;
    endYear?: string | number;
  };
}
