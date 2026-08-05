interface InventoryTransaction {
  id: number;
  product_id: number;
  transaction_type: string;
  quantity: number;
  note: string | null;
  created_at: string;
}

interface Props {
  transactions: InventoryTransaction[];
}

export default function InventoryTable({
  transactions,
}: Props) {
  return (
    <table className="w-full bg-white rounded-xl shadow">
      <thead>
        <tr className="border-b">
          <th className="p-4 text-left">ID</th>
          <th className="p-4 text-left">Product ID</th>
          <th className="p-4 text-left">Type</th>
          <th className="p-4 text-left">Quantity</th>
          <th className="p-4 text-left">Note</th>
          <th className="p-4 text-left">Date</th>
        </tr>
      </thead>

      <tbody>
        {transactions.map((transaction) => (
          <tr
            key={transaction.id}
            className="border-b"
          >
            <td className="p-4">
              {transaction.id}
            </td>

            <td className="p-4">
              {transaction.product_id}
            </td>

            <td className="p-4 capitalize">
              {transaction.transaction_type.replace("_", " ")}
            </td>

            <td className="p-4">
              {transaction.quantity}
            </td>

            <td className="p-4">
              {transaction.note ?? "-"}
            </td>

            <td className="p-4">
              {new Date(
                transaction.created_at
              ).toLocaleString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
