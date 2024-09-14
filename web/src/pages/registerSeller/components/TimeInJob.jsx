import { useState } from "react";
import ButtonList from "../ui/ButtonList";
import dataYears from "../utils/years";
import dataMonths from "../utils/month";

export default function TimeInJob() {
  const [years, setYears] = useState(dataYears);
  const [months, setMonths] = useState(dataMonths);

  return (
    <div className="flex space-x-6 pb-4">
      <div className="flex flex-col w-full ">
        <p className="pb-2 font-medium"> Fecha de inicio *</p>
        <div className="flex h-9 space-x-2 ">
          <ButtonList name="Mes" values={months} />
          <ButtonList name="Año" values={years} />
        </div>
      </div>
      <div className="flex flex-col w-full ">
        <p className="pb-2 font-medium"> Fecha de inicio *</p>
        <div className="flex h-9 space-x-2 ">
          <ButtonList name="Mes" values={months} />
          <ButtonList name="Año" values={years} />
        </div>
      </div>
    </div>
  );
}
