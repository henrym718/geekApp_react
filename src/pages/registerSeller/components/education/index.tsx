import { useState } from "react";
import Modal from "../../../../ui/Modal";
import AddButton from "../../ui/AddButton";
import EducationForm from "./EducationForm";

export default function index() {
  const [isOpenModal, SetIsOpenModal] = useState(false);

  const setCloseModal = () => SetIsOpenModal(false);
  const setOpenModal = () => SetIsOpenModal(true);

  return (
    <div className="h-full w-4/6 ml-[50px]">
      <div className="flex flex-col h-full pb-8 overflow-y-auto">
        <p className="pb-5 text-base font-semibold"> 5/7</p>
        <h2 className="text-[35px] text-color3 font-medium pb-3 leading-tight w-3/6">
          A los clientes les guta saber sobre tu formación académica
        </h2>
        <p className="text-base font-normal pb-10 w-3/6">
          Nos es necesario tener estudios superiores, agregando alguna educación relevante ayudas
          que tu perfil sea mas visible, estos pueden ser bootcamps, cursos, certificaciones, etc.
        </p>
        <div className="flex items-center gap-5">
          <AddButton name="Añadir Educación" setIsOpenModal={setOpenModal}></AddButton>
        </div>
      </div>
      <Modal isOpenModal={isOpenModal} setCloseModal={setCloseModal}>
        <EducationForm />
      </Modal>
    </div>
  );
}
