import Item from "./Item";
import { adapJobToItem } from "../../adapter/itemAdapter";
import { Job } from "../../../../types/seller";

interface JobsListProps {
  items: Array<Job>;
}

export default function Itemslist({ items }: JobsListProps) {
  return (
    <div className="flex gap-2 flex-wrap w-full h-[200px] overflow-x-auto">
      {items.map((item) => {
        return <Item item={adapJobToItem(item)} />;
      })}
    </div>
  );
}
