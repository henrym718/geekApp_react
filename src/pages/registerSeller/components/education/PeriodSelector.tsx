import { useState } from "react";
import ButtonList from "../../ui/ButtonList";
import years from "../../utils/years";

interface PeriodSelectorProps {
  onSelect: () => void;
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

  const handleOnSelect = () => {};

  return (
    <div className="flex flex-col w-full ">
      <p className="pb-2 font-medium"> Periodo asistido</p>
      <div className="flex gap-8 h-9 w-full">
        <ButtonList
          name="Año de inicio"
          values={years}
          disabled={false}
          onSelected={handleOnSelect}
        />
        <ButtonList
          name="Año de graduación"
          values={years}
          disabled={false}
          onSelected={handleOnSelect}
        />
      </div>
    </div>
  );
}
