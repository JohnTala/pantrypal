import PantryItemCard from "./PantryItemCard";


type PantryItem = {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  expiryDate: string;
};


interface PantryListProps {
  items: PantryItem[];
}


export default function PantryList({
  items,
}: PantryListProps) {


  if (items.length === 0) {
    return (
      <p className="text-slate-500">
        No pantry items found.
      </p>
    );
  }


  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

      {items.map((item) => (
        <PantryItemCard
          key={item.id}
          {...item}
        />
      ))}

    </div>
  );
}