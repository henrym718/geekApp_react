import { useMemo, useState } from "react";
import { Button } from "../../../../ui";
import Input from "../../../../ui/Input";
import TextArea from "../../../../ui/TextArea";
import PeriodSelector from "./PeriodSelector";
import useDataForm from "../../store/dataForm";
import { Education } from "../../../../types/seller";
import Autocomplete from "../../ui/Autocomplete";
import { educationLevel } from "../../utils/levelOfEducation";

interface Props {
  setCloseModal: () => void;
}

export default function EducationForm({ setCloseModal }: Props) {
  const [selected, setSetselected] = useState<Partial<Education>>();
  const { setEducation } = useDataForm((state) => state);

  const hanldeOptSelected = (key: string, value: string | { startYear: string; endYear: string }) => {
    setSetselected((prev) => ({
      ...prev,
      ...(typeof value === "object" ? { period: value } : { [key]: value }),
    }));
  };

  const isDisableButton = useMemo(() => {
    return (
      selected?.institute &&
      selected.level &&
      selected.period?.endYear &&
      selected.period.startYear &&
      selected.title
    );
  }, [selected]);

  const handleOnClick = () => {
    setEducation(selected);
    setCloseModal();
  };

  return (
    <div className="py-9 px-8 w-[630px] h-full">
      <h2 className="text-4xl text-black font-medium pb-6">Agregar Historial Académico</h2>

      <div className="pb-6">
        <p className="pb-2 font-medium">Centro de Formación</p>
        <Input
          onChange={(e) => hanldeOptSelected(e.target.name, e.target.value)}
          name="institute"
          className="h-9"
          variant="default"
          placeholder="Ex: Universidad de Guayaquil"
        />
      </div>
      <div className="pb-6">
        <p className="pb-2 font-medium">Título</p>
        <Input
          onChange={(e) => hanldeOptSelected(e.target.name, e.target.value)}
          name="title"
          className="h-9"
          variant="default"
          placeholder="Ex: Digital Product Manager"
        />
      </div>
      <div className="pb-6">
        <p className="pb-2 font-medium"> Nivel de estudios</p>
        <Autocomplete
          data={educationLevel}
          placeholder="Ex: Bootcamp"
          onSelect={(value) => hanldeOptSelected("level", value)}
        />
      </div>
      <div className="pb-6">
        <PeriodSelector onSelect={(opts) => hanldeOptSelected("period", opts)} />
      </div>
      <div className="flex flex-col pb-6">
        <p className="pb-2 font-medium"> Detalles de la formación</p>
        <TextArea
          onChange={(e) => hanldeOptSelected(e.target.name, e.target.value)}
          name="details"
          variant="default"
          rows={1}
        />
      </div>
      <div className="flex gap-6 justify-end items-center">
        <Button className="h-9" variant="transparent">
          Cancelar
        </Button>
        <Button className="h-9" onClick={handleOnClick} variant="green" disabled={!isDisableButton}>
          Guardar
        </Button>
      </div>
    </div>
  );
}
