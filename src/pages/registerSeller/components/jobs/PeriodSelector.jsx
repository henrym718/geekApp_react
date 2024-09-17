import { useState } from "react";
import ButtonList from "./ButtonList";
import dataYears from "../../utils/years";
import dataMonths from "../../utils/month";

export default function PeriodSelector({ disabled }) {
  const [optsSelected, setOptsSelected] = useState({
    startMonth: null,
    startYear: null,
    endMonth: null,
    endYear: null,
  });
  const [endYears, setEndYears] = useState([]);

  const handleMonthSelected = (key, value) => {
    setOptsSelected((prev) => ({ ...prev, [key]: value }));
  };

  const handleYearSelected = (key, value) => {
    setOptsSelected((prev) => ({ ...prev, [key]: value }));
    if (key === "startYear") {
      const yearsFilter = dataYears.filter((year) => +year >= +value);
      setEndYears(yearsFilter);
    }
  };

  return (
    <div className="flex space-x-6 pb-4">
      <div className="flex flex-col w-full ">
        <p className="pb-2 font-medium"> Fecha de inicio *</p>
        <div className="flex h-9 space-x-2 ">
          <ButtonList
            name="Mes"
            values={dataMonths}
            onSelected={(startMonth) => handleMonthSelected("startMonth", startMonth)}
          />
          <ButtonList
            name="Año"
            values={dataYears}
            onSelected={(startYear) => handleYearSelected("startYear", startYear)}
          />
        </div>
      </div>
      <div className="flex flex-col w-full ">
        <p className="pb-2 font-medium"> Fecha de inicio *</p>
        <div className="flex h-9 space-x-2 ">
          <ButtonList
            name="Mes"
            values={dataMonths}
            onSelected={(endMonth) => handleMonthSelected("endMonth", endMonth)}
            disabled={disabled}
          />
          <ButtonList
            name="Año"
            values={endYears}
            onSelected={(endYear) => handleYearSelected("endYear", endYear)}
            disabled={disabled}
          />
        </div>
      </div>
    </div>
  );
}
