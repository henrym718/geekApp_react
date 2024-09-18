import { useEffect, useState } from "react";
import PeriodSelector from "./PeriodSelector";
import Autocomplete from "./Autocomplete";
import { Button } from "../../../../ui";
import { Job } from "../../../../types/seller";

interface PropsJobForm {
  onSelect: (job: Job) => void;
  setCloseModal: () => void;
}

export default function JobForm({ onSelect, setCloseModal }: PropsJobForm) {
  const [isDisabledButton, setIsDisabledButton] = useState(true);
  const [keepWorking, setKeepWorking] = useState(false);

  const [job, setJob] = useState<Job>({
    company: "",
    city: "",
    country: "",
    role: "",
    responsabilities: "",
    period: {
      startMonth: "",
      startYear: "",
      endMonth: "",
      endYear: "",
    },
  });

  const handleOnSelected = (key: string, opt: string) => {
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
  }, [job, keepWorking]);

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
            <Autocomplete onSelect={(opt: string) => handleOnSelected("country", opt)} />
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
        onSelected={(opt: string) => handleOnSelected("period", opt)}
        keepWorking={(value: boolean) => setKeepWorking(value)}
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
        <Button className="h-9" variant="transparent" onClick={() => setCloseModal()}>
          Cancelar
        </Button>
        <Button className="h-9" variant="green" onClick={handleOnClick} disabled={isDisabledButton}>
          Guardar
        </Button>
      </div>
    </div>
  );
}
