import { Plus } from "lucide-react";

interface AddExperienceIconProps {
  setOpenModal: () => void;
}

export default function AddExperienceIcon({ setOpenModal }: AddExperienceIconProps) {
  return (
    <Plus
      onClick={() => setOpenModal()}
      size={38}
      color="green"
      strokeWidth={1}
      className=" rounded-full p-1 border-2 border-green-500 cursor-pointer"
    />
  );
}
