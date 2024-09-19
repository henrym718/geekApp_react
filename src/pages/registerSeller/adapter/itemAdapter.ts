import { Item } from "../components/jobs/Item";
import { Job } from "../../../types/seller";

export function adapJobToItem(job: Job): Item {
  const {
    city,
    company,
    country,
    role,
    period: { startMonth, startYear, endMonth, endYear },
  } = job;

  const formatPeriod = (
    startMonth: string | number,
    startYear: string | number,
    endMonth: string | number | undefined,
    endYear: string | number | undefined
  ) => {
    return endMonth && endYear
      ? `${startMonth} ${startYear} - ${endMonth} ${endYear}`
      : `${startMonth} ${startYear}`;
  };

  return {
    id: role,
    title: role,
    content: `${company}| ${formatPeriod(startMonth, startYear, endMonth, endYear)} `,
    footer: `${city}, ${country}`,
  };
}
