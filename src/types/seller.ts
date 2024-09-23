export interface Experience {
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

export interface Education {
  institute: string;
  title: string;
  level: string;
  period: {
    startYear: string;
    endYear: string;
  };
  details: string;
}
