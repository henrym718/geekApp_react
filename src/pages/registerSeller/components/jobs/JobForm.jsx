import { useState } from "react";
import PeriodSelector from "./PeriodSelector";
import Autocomplete from "./Autocomplete";

export default function JobForm() {
  const [disabled, setDisabled] = useState(false);

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
        />
      </div>
      <div className="flex flex-col pb-6">
        <p className="pb-2 font-medium">Ubicacion *</p>
        <div className="flex space-x-8">
          <input
            name="company"
            className=" w-1/2 h-9 border border-black border-opacity-15 rounded-lg pl-3"
            type="text"
            placeholder="Ej: Guayaquil"
            autoComplete="off"
          />

          <div className="w-1/2">
            <Autocomplete />
          </div>
        </div>
      </div>
      <div className="pb-6">
        <p className="pb-2 font-medium">Cargo *</p>
        <input
          name="job"
          className="h-9 w-full border border-black border-opacity-15 rounded-lg pl-3"
          type="text"
          placeholder="Ej: Ingeniero de Software"
          autoComplete="off"
        />
      </div>
      <PeriodSelector disabled={disabled} />
      <label className=" inline-flex items-center space-x-2 mb-6">
        <input onClick={() => setDisabled((prev) => !prev)} className="h-5 w-5" type="checkbox" />
        <p className="text-color1">Actualmente estoy trabajando aqui</p>
      </label>
      <div className="flex flex-col w-full pb-10">
        <p className="pb-2 font-medium">Descripciòn</p>
        <textarea
          className="w-full border border-black border-opacity-15 rounded-lg px-2 py-2"
          rows={6}
          name="description"
        />
      </div>
      <div className="flex gap-6 justify-end items-center">
        <button className="text-slate-500 text-sm">Cancelar</button>
        <button className="h-9 bg-green-700 text-white rounded-lg px-6">Guardar</button>
      </div>
    </div>
  );
}
