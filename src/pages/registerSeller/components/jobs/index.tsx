import { useState } from "react";
import { Job } from "../../../../types/seller";
import UseDataForm from "../../store/dataForm";
import Modal from "../../../../ui/Modal";
import AddExperienceButton from "./AddExperienceButton";
import JobForm from "./JobForm";
import ItemsList from "./ItemsList";

export default function Jobs() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const setCloseModal = () => setIsOpenModal(false);
  const { jobs, setJobs } = UseDataForm((state) => state);

  const handleOnSelet = (job: Job) => {
    setJobs(job);
  };
  console.log(jobs);
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
        <div className="flex gap-2">
          <AddExperienceButton setIsOpenModal={setIsOpenModal} />
          <ItemsList items={jobs} />
        </div>
        <Modal isOpenModal={isOpenModal} setCloseModal={setCloseModal}>
          <div className="h-[800px] w-[700px]">
            <JobForm setCloseModal={setCloseModal} onSelect={handleOnSelet} />
          </div>
        </Modal>
      </div>
    </div>
  );
}
