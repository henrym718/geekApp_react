import { useEffect, useMemo, useState } from "react";
import ButtonList from "../../ui/ButtonList";
import years from "../../utils/years";

interface PeriodSelectorProps {
  onSelect: (opts: OptsSelected) => void;
}
interface OptsSelected {
  startYear: string;
  endYear: string;
}

export default function PeriodSelector({ onSelect }: PeriodSelectorProps) {
  const [optsSelected, setOptsSelected] = useState<OptsSelected>({
    startYear: "",
    endYear: "",
  });

  const handleOnSelect = (key: string, value: string) => {
    setOptsSelected((prev) => ({ ...prev, [key]: value }));
  };

  const endYearOptions = useMemo(() => {
    return years.filter((year) => +year >= +optsSelected.startYear);
  }, [optsSelected.startYear]);

  useEffect(() => {
    onSelect(optsSelected);
  }, [optsSelected]);

  return (
    <div className="flex flex-col w-full ">
      <p className="pb-2 font-medium"> Periodo asistido</p>
      <div className="flex gap-8 h-9 w-full">
        <ButtonList
          name="Año de inicio"
          values={years}
          disabled={false}
          onSelected={(startYear: string) => handleOnSelect("startYear", startYear)}
        />
        <ButtonList
          name="Año de graduación"
          values={endYearOptions}
          disabled={false}
          onSelected={(endYear: string) => handleOnSelect("endYear", endYear)}
        />
      </div>
    </div>
  );
}
