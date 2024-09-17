import { Plus } from "lucide-react";

export default function AddExperienceButton({ setIsOpenModal }) {
  return (
    <div
      onClick={() => setIsOpenModal(true)}
      className=" flex flex-col  pl-6 justify-center h-[250px] w-[450px] border-2 border-dashed border-black border-opacity-20 rounded-2xl bg-black bg-opacity-[0.02] cursor-pointer"
    >
      <Plus size={35} color="#faf9f9" className="bg-green-600 rounded-full mb-2" />
      <p className="text-2xl text-color4 font-medium ">Agregar experiencia</p>
    </div>
  );
}
