import { useState } from "react";
import Modal from "../../../../ui/Modal";
import { Button } from "../../../../ui";
import { Plus } from "lucide-react";
import ImageCropper from "./ImageCropper";

interface State {
  isOpenModal: boolean;
}

export default function Avatar() {
  const [isOpenModal, setIsOpenmodal] = useState<State["isOpenModal"]>(true);

  const openModal = () => setIsOpenmodal(true);
  const closeModal = () => setIsOpenmodal(false);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-40 h-40 rounded-full bg-slate-400 border border-red-200"></div>
      <div
        className="flex gap-2 border border-green-500 justify-center items-center rounded-lg px-2 py-1 cursor-pointer w-32 hover:border-2"
        onClick={openModal}
      >
        <Plus size={15} color="green" />
        <p className="text-green-500">Subir Foto</p>
      </div>
      <Modal isOpenModal={isOpenModal} setCloseModal={closeModal}>
        <div className="h-[450px] w-[620px]  px-9 py-5">
          <p className="text-3xl font-medium pb-5">Tu foto</p>
          <div className="flex gap-6">
            <section className="flex flex-col gap-2 justify-center">
              <ImageCropper />
              <div className="flex justify-center items-center w-56 h-56 rounded-full bg-black bg-opacity-5 border-2 border-dashed">
                <div className="w-20 h-20 rounded-full bg-slate-200"></div>
              </div>
              <p className="text-center text-xs text-slate-400"> 250 x 250 Min / 5 MB Max.</p>
            </section>

            <section className="flex flex-col items-center">
              <h3>!Muestrales a los clientes la mejor versión de ti¡</h3>
              <div className=" flex gap-2 items-baseline">
                <div className="w-20 h-20 rounded-full bg-slate-400 border border-red-200"></div>
                <div className="w-10 h-10 rounded-full bg-slate-400 border border-red-200"></div>
                <div className="w-5 h-5 rounded-full bg-slate-400 border border-red-200"></div>
              </div>
            </section>
          </div>
        </div>
      </Modal>
    </div>
  );
}
