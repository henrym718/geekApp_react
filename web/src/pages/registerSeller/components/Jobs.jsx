import { useState } from "react";
import { Plus } from "lucide-react";
import Modal from "../../../ui/Modal";

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
          <div className="h-[400px] w-[400px]">ddd</div>
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
