import DeleteDialog from "./DeleteDialog";

type PantryItemCardProps = {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  expiryDate: string;
};

export default function PantryItemCard({
  id,
  name,
  category,
  quantity,
  unit,
  expiryDate,
}: PantryItemCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-800">
            {name}
          </h3>

          <p className="text-sm text-slate-500">
            Category: {category}
          </p>

          <p className="text-sm text-slate-500">
            Quantity: {quantity} {unit}
          </p>

          <p className="mt-2 text-sm text-green-700">
            Expires:{" "}
            {new Date(expiryDate).toLocaleDateString()}
          </p>
        </div>

       <DeleteDialog itemId={id} itemName={name} />
      </div>

    </div>
  );
}