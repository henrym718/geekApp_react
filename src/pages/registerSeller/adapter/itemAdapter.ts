import { Item } from "../components/experience/Item";
import { Job } from "../../../types/seller";

export function adapJobToItem(job: Job): Item {
  const { city, company, country, role, period } = job;

  const formatPeriod = (
    startMonth: string,
    startYear: string,
    endMonth: string,
    endYear: string
  ) => {
    return endMonth && endYear
      ? `${startMonth} ${startYear} - ${endMonth} ${endYear}`
      : `${startMonth} ${startYear} - actual`;
  };

  return {
    title: role,
    content: `${company} | ${formatPeriod(
      period?.startMonth,
      period?.startYear,
      period?.endMonth,
      period?.endYear
    )} `,
    footer: `${city}, ${country}`,
  };
}
