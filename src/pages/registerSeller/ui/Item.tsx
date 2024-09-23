import { Trash2 } from "lucide-react";
import useDataForm from "../store/dataForm";

export interface Item {
  title: string;
  content: string;
  footer: string;
}

interface ItemProps {
  item: Item;
  index: number;
  removeItem: (index: number) => void;
  Icon: React.ReactNode;
}

export default function Item({ item, index, Icon, removeItem }: ItemProps) {
  const { removeJob } = useDataForm((state) => state);
  return (
    <div className="relative border-2 rounded-md h-[250px] w-[450px] px-4 py-6">
      <div className="flex gap-4">
        {Icon}
        <div className="flex flex-col">
          <h2 className="text-xl font-medium pb-5">{item.title}</h2>
          <p className="text-sm font-medium pb-2">{item.content}</p>
          <p className="text-xs"> {item.footer}</p>
        </div>
      </div>
      <Trash2
        onClick={() => removeItem(index)}
        size={35}
        className="absolute top-5 right-5 p-1 border-2 border-green-600 rounded-full text-green-600 cursor-pointer"
      />
    </div>
  );
}
