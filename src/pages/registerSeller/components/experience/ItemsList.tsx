import Item from "./Item";
import { adapJobToItem } from "../../adapter/itemAdapter";
import { Job } from "../../../../types/seller";

interface JobsListProps {
  items: Array<Job>;
}

export default function Itemslist({ items }: JobsListProps) {
  return (
    <div className="flex gap-4 flex-wrap">
      {items.map((item, index) => {
        return <Item key={index} index={index} item={adapJobToItem(item)} />;
      })}
    </div>
  );
}
