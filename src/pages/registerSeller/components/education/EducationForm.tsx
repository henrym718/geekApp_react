import { Button } from "../../../../ui";
import Input from "../../../../ui/Input";
import TextArea from "../../../../ui/TextArea";
import PeriodSelector from "./PeriodSelector";

export default function EducationForm() {
  return (
    <div className="py-9 px-8 w-[630px] h-full">
      <h2 className="text-4xl text-black font-medium pb-6">Agregar Historial Académico</h2>

      <div className="pb-6">
        <p className="pb-2 font-medium">Centro de Formación</p>
        <Input className="h-9" variant="default" placeholder="Ex: Universidad de Guayaquil" />
      </div>
      <div className="pb-6">
        <p className="pb-2 font-medium">Título</p>
        <Input className="h-9" variant="default" placeholder="Ex: Digital Product Manager" />
      </div>
      <div className="pb-6">
        <p className="pb-2 font-medium"> Nivel de estudios</p>
        <Input className="h-9" variant="default" placeholder="Ex: Bootcamp" />
      </div>
      <div className="pb-6">
        <PeriodSelector onSelect={() => ""} />
      </div>
      <div className="flex flex-col pb-6">
        <p className="pb-2 font-medium"> Periodo asistido</p>
        <TextArea variant="default" rows={1} />
      </div>
      <div className="flex gap-6 justify-end items-center">
        <Button variant="transparent"> Cancelar</Button>
        <Button variant="green" disabled={true}>
          Guardar
        </Button>
      </div>
    </div>
  );
}
