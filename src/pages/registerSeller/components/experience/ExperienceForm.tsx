import { useEffect, useState } from "react";
import PeriodSelector from "./PeriodSelector";
import Autocomplete from "../../ui/Autocomplete";
import { Button } from "../../../../ui";
import { Experience } from "../../../../types/seller";
import countries from "../../utils/countries";

interface Props {
  onSelect: (experience: Experience) => void;
  setCloseModal: () => void;
}

interface State {
  experience: Experience;
  keepWorking: boolean;
  isDisabledButton: boolean;
}

export default function ExperienceForm({ onSelect, setCloseModal }: Props) {
  const [isDisabledButton, setIsDisabledButton] = useState<State["isDisabledButton"]>(true);
  const [keepWorking, setKeepWorking] = useState<State["keepWorking"]>(false);
  const [experience, setExperience] = useState<State["experience"]>({
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
    setExperience((prev) => ({ ...prev, [key]: opt }));
  };

  const handleOnClick = () => {
    onSelect(experience);
    setCloseModal();
  };

  useEffect(() => {
    const verifyIsPeriodCompleted = () => {
      if (keepWorking) {
        return experience.period.startMonth && experience.period.startYear;
      } else {
        return (
          experience.period.startMonth &&
          experience.period.startYear &&
          experience.period.endMonth &&
          experience.period.endYear
        );
      }
    };
    const isAllFieldsComplete =
      experience.company &&
      experience.city &&
      experience.country &&
      experience.role &&
      verifyIsPeriodCompleted();

    setIsDisabledButton(!isAllFieldsComplete);
  }, [experience, keepWorking]);

  return (
    <div className="py-9 px-8 w-[630px] h-full">
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
            <Autocomplete
              data={countries}
              placeholder="Ex: Ecuador"
              onSelect={(opt) => handleOnSelected("country", opt)}
            />
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
