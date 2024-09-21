import { useState } from "react";
import { Job } from "../../../../types/seller";
import UseDataForm from "../../store/dataForm";
import Modal from "../../../../ui/Modal";
import AddButton from "../../ui/AddButton";
import AddIcon from "../../ui/AddIcon";
import ExperienceForm from "./ExperienceForm";
import ItemsList from "../../ui/ItemsList";

export default function Jobs() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { jobs, setJobs } = UseDataForm((state) => state);

  const setCloseModal = () => setIsOpenModal(false);
  const setOpenModal = () => setIsOpenModal(true);

  const handleOnSelet = (job: Job) => {
    setJobs(job);
  };

  return (
    <div className="h-full w-4/6 ml-[50px]">
      <div className="flex flex-col h-full pb-8 overflow-y-auto">
        <p className="pb-5 text-base font-semibold"> 4/5</p>
        <h2 className="text-[35px] text-color3 font-medium pb-3 leading-tight w-3/6">
          Es momento que nos cuentanos sobre tu experiencia laboral
        </h2>
        <p className="text-base font-normal pb-10 w-3/6">
          Al agregar tu experiencia en empresas tienes mayor posibilidades de concretar ofertas,
          pero si recien estas empezando aun puedes crear un gran perfil, solo continua a la
          siguiente pagina.
        </p>
        <div className="flex items-center gap-5">
          <div>
            {!jobs.length ? (
              <AddButton setIsOpenModal={setOpenModal} name="Agregar experiencia" />
            ) : (
              <AddIcon setOpenModal={setOpenModal} />
            )}
          </div>
          {jobs.length ? <ItemsList items={jobs} /> : null}{" "}
        </div>
      </div>
      <Modal isOpenModal={isOpenModal} setCloseModal={setCloseModal}>
        <ExperienceForm setCloseModal={setCloseModal} onSelect={handleOnSelet} />
      </Modal>
    </div>
  );
}
