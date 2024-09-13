import { useState } from "react";
import Modal from "../../../ui/Modal";
import Autocomplete from "../../../ui/Autocomplete";
import { Plus } from "lucide-react";
import { ChevronDown } from "lucide-react";

export default function Jobs() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const setCloseModal = () => setIsOpenModal(false);

  return (
    <div className=" h-full w-4/6 ml-[50px]">
      <div className="flex flex-col">
        <p className="pb-5 text-base font-semibold"> 4/5</p>
        <h2 className="text-[35px] text-color3 font-medium pb-3 leading-tight w-3/6">
          Es momento que nos cuentanos sobre tu experiencia laboral
        </h2>
        <p className="text-base font-normal pb-10 w-3/6">
          Al agregar tu experiencia en empresas tienes mayor posibilidades de concretar ofertas,
          pero si recien estas empezando aun puedes crear un gran perfil, solo continua a la
          siguiente pagina.
        </p>
        <AddExperience setIsOpenModal={setIsOpenModal} />
        <Modal isOpenModal={isOpenModal} setCloseModal={setCloseModal}>
          <div className="h-[800px] w-[700px]">
            <JobForm />
          </div>
        </Modal>
      </div>
    </div>
  );
}

const AddExperience = ({ setIsOpenModal }) => {
  return (
    <div
      onClick={() => setIsOpenModal(true)}
      className=" flex flex-col  pl-6 justify-center h-[250px] w-[450px] border-2 border-dashed border-black border-opacity-20 rounded-2xl bg-black bg-opacity-[0.02] cursor-pointer"
    >
      <Plus size={35} color="#faf9f9" className="bg-green-600 rounded-full mb-2" />
      <p className="text-2xl text-color4 font-medium ">Agregar experiencia</p>
    </div>
  );
};

const JobForm = () => {
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
      <div className="flex space-x-6 pb-4">
        <div className="flex flex-col w-full ">
          <p className="pb-2 font-medium"> Fecha de inicio *</p>
          <div className="flex h-9 space-x-2 ">
            <ButonOpt name="Año" />
            <ButonOpt name="Mes" />
          </div>
        </div>
        <div className="flex flex-col w-full ">
          <p className="pb-2 font-medium"> Fecha de inicio *</p>
          <div className="flex h-9 space-x-2 ">
            <ButonOpt name="Año" />
            <ButonOpt name="Mes" />
          </div>
        </div>
      </div>
      <label className=" flex items-center space-x-2">
        <input className="h-5 w-5" type="checkbox" />
        <p className="text-color1">Actualmente estoy trabajando aqui</p>
      </label>
    </div>
  );
};

const ButonOpt = ({ name }) => {
  return (
    <div className="relative flex w-full h-full">
      <button className="w-full border rounded-lg text-start pl-4 text-sm ">{name}</button>
      <ChevronDown
        className="absolute top-1/2 right-4 -translate-y-1/2 text-black"
        strokeWidth={1}
        size={25}
      />
    </div>
  );
};
