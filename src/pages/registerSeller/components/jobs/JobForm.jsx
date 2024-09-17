import { useEffect, useState } from "react";
import PeriodSelector from "./PeriodSelector";
import Autocomplete from "./Autocomplete";

export default function JobForm({ onSelect, setCloseModal }) {
  const [isDisabledButton, setIsDisabledButton] = useState(true);
  const [keepWorking, setKeepWorking] = useState(null);

  const [job, setJob] = useState({
    company: null,
    city: null,
    country: null,
    role: null,
    responsabilities: null,
    period: {
      startMonth: null,
      startYear: null,
      endMonth: null,
      endYear: null,
    },
  });

  console.log(job);
  const handleOnSelected = (key, opt) => {
    setJob((prev) => ({ ...prev, [key]: opt }));
  };

  const handleOnClick = () => {
    onSelect(job);
  };

  useEffect(() => {
    const verifyIsPeriodCompleted = () => {
      if (keepWorking) {
        return job.period.startMonth && job.period.startYear;
      } else {
        return (
          job.period.startMonth && job.period.startYear && job.period.endMonth && job.period.endYear
        );
      }
    };

    const isAllFieldsComplete =
      job.company && job.city && job.country && job.role && verifyIsPeriodCompleted();

    setIsDisabledButton(!isAllFieldsComplete);
  }, [job]);

  return (
    <div className="py-9 px-8">
      <h2 className="text-4xl text-black font-medium pb-6">Agregar Experiencia Laboral</h2>

      <div className="pb-6">
        <p className="pb-2 font-medium">Empresa *</p>
        <input
          name="company"
          className="h-9 w-full border border-black border-opacity-15 rounded-lg pl-3"
          type="text"
          placeholder="Ej: Microsoft"
          autoComplete="off"
          onChange={(e) => handleOnSelected(e.target.name, e.target.value)}
        />
      </div>
      <div className="flex flex-col pb-6">
        <p className="pb-2 font-medium">Ubicacion *</p>
        <div className="flex space-x-8">
          <input
            name="city"
            className=" w-1/2 h-9 border border-black border-opacity-15 rounded-lg pl-3"
            type="text"
            placeholder="Ej: Guayaquil"
            autoComplete="off"
            onChange={(e) => handleOnSelected(e.target.name, e.target.value)}
          />

          <div className="w-1/2">
            <Autocomplete onSelect={(opt) => handleOnSelected("country", opt)} />
          </div>
        </div>
      </div>
      <div className="pb-6">
        <p className="pb-2 font-medium">Cargo *</p>
        <input
          name="role"
          className="h-9 w-full border border-black border-opacity-15 rounded-lg pl-3"
          type="text"
          placeholder="Ej: Ingeniero de Software"
          autoComplete="off"
          onChange={(e) => handleOnSelected(e.target.name, e.target.value)}
        />
      </div>
      <PeriodSelector
        onSelected={(opt) => handleOnSelected("period", opt)}
        keepWorking={(value) => setKeepWorking(value)}
      />

      <div className="flex flex-col w-full pb-10">
        <p className="pb-2 font-medium">Descripciòn</p>
        <textarea
          className="w-full border border-black border-opacity-15 rounded-lg px-2 py-2"
          rows={6}
          name="responsabilities"
          onChange={(e) => handleOnSelected(e.target.name, e.target.value)}
        />
      </div>
      <div className="flex gap-6 justify-end items-center">
        <button onClick={() => setCloseModal()} className="text-slate-500 text-sm">
          Cancelar
        </button>
        <button
          disabled={isDisabledButton}
          onClick={handleOnClick}
          className="h-9 bg-green-700 text-white rounded-lg px-6 disabled:bg-black disabled:bg-opacity-15 disabled:cursor-default"
        >
          Guardar
        </button>
      </div>
    </div>
  );
}
