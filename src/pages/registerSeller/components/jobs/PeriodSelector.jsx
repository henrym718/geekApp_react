import { useEffect, useState } from "react";
import ButtonList from "./ButtonList";
import dataYears from "../../utils/years";
import dataMonths from "../../utils/month";

export default function PeriodSelector({ onSelected, keepWorking }) {
  const [optsSelected, setOptsSelected] = useState({
    startMonth: null,
    startYear: null,
    endMonth: null,
    endYear: null,
  });
  const [endYears, setEndYears] = useState([]);
  const [currentJob, setCurrentJob] = useState(false);

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

  const handleCurrentJob = () => {
    setCurrentJob((prev) => !prev);
  };

  useEffect(() => {
    onSelected(optsSelected);
    keepWorking(currentJob);
  }, [optsSelected]);

  return (
    <div className="flex flex-col">
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
              disabled={currentJob}
            />
            <ButtonList
              name="Año"
              values={endYears}
              onSelected={(endYear) => handleYearSelected("endYear", endYear)}
              disabled={currentJob}
            />
          </div>
        </div>
      </div>
      <label className=" inline-flex items-center space-x-2 mb-6">
        <input onClick={handleCurrentJob} className="h-5 w-5" type="checkbox" />
        <p className="text-color1">Actualmente estoy trabajando aqui</p>
      </label>
    </div>
  );
}
