import Item from "./Item";
import { adapJobToItem } from "../../adapter/itemAdapter";
import { Job } from "../../../../types/seller";

interface JobsListProps {
  items: Array<Job>;
}

export default function Itemslist({ items }: JobsListProps) {
  return (
    <div>
      {items.map((item) => {
        return <Item item={adapJobToItem(item)} />;
      })}
    </div>
  );
}
