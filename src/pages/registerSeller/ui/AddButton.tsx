import { Plus } from "lucide-react";

interface AddButtonProps {
  setIsOpenModal: () => void;
  name: string;
}

export default function AddButton({ setIsOpenModal, name }: AddButtonProps) {
  return (
    <div
      onClick={() => setIsOpenModal()}
      className=" flex flex-col pl-6 justify-center h-[250px] w-[400px] border-2 border-dashed border-black border-opacity-20 rounded-2xl bg-black bg-opacity-[0.02] cursor-pointer"
    >
      <Plus size={35} color="#faf9f9" className="bg-green-600 rounded-full mb-4" />
      <p className="text-2xl text-color4 font-medium "> {name}</p>
    </div>
  );
}
