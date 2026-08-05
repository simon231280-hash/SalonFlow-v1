interface StockMovement {
  product_name: string;
  transaction_type: string;
  quantity: number;
  note: string | null;
  created_at: string;
}

interface Props {
  movements: StockMovement[];
}

export default function StockMovementsTable({
  movements,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mt-8">
      <h2 className="text-xl font-bold mb-4">
        Stock Movements
      </h2>

      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2">
              Product
            </th>

            <th className="text-center py-2">
              Type
            </th>

            <th className="text-right py-2">
              Quantity
            </th>

            <th className="text-left py-2">
              Note
            </th>

            <th className="text-center py-2">
              Date
            </th>
          </tr>
        </thead>

        <tbody>
          {movements.map((movement, index) => (
            <tr
              key={index}
              className="border-b"
            >
              <td className="py-2">
                {movement.product_name}
              </td>

              <td className="text-center capitalize">
                {movement.transaction_type.replace("_", " ")}
              </td>

              <td className="text-right">
                {movement.quantity}
              </td>

              <td>
                {movement.note ?? "-"}
              </td>

              <td className="text-center">
                {new Date(
                  movement.created_at
                ).toLocaleDateString()}
              </td>
            </tr>
          ))}

          {movements.length === 0 && (
            <tr>
              <td
                colSpan={5}
                className="py-4 text-center text-gray-500"
              >
                No stock movements.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
