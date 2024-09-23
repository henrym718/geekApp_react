import { Item } from "../ui/Item";
import { Experience, Education } from "../../../types/seller";

export function adapExperienceToItem(experience: Experience): Item {
  const { city, company, country, role, period } = experience;

  const formatPeriod = (startMonth: string, startYear: string, endMonth: string, endYear: string) => {
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

export function adapEducationToItem(education: Education): Item {
  const { institute, title, level, period } = education;
  console.log({ education });
  return {
    title: title,
    content: `${institute} | ${period?.startYear} - ${period?.endYear} `,
    footer: level,
  };
}
