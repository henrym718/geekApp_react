import { Education, Experience } from "../../../types/seller";
import { Item } from "./Item";
import ItemComponenet from "./Item";

interface ItemsListProps<T> {
  items: Array<T>;
  removeItem: (index: number) => void;
  adapterItem: (item: T) => Item;
  Icon: React.ReactNode;
}

export default function Itemslist<T extends Experience | Education>({
  items,
  removeItem,
  adapterItem,
  Icon,
}: ItemsListProps<T>) {
  return (
    <div className="flex gap-4 flex-wrap">
      {items.map((item, index) => {
        return (
          <ItemComponenet
            key={index}
            Icon={Icon}
            index={index}
            item={adapterItem(item)}
            removeItem={removeItem}
          />
        );
      })}
    </div>
  );
}
