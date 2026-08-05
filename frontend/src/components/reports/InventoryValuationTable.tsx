interface InventoryValuation {
  product_id: number;
  product_name: string;
  stock_quantity: number;
  unit_price: string;
  stock_value: string;
}

interface Props {
  products: InventoryValuation[];
}

export default function InventoryValuationTable({
  products,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mt-8">
      <h2 className="text-xl font-bold mb-4">
        Inventory Valuation
      </h2>

      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2">
              Product
            </th>

            <th className="text-right py-2">
              Stock
            </th>

            <th className="text-right py-2">
              Unit Price
            </th>

            <th className="text-right py-2">
              Stock Value
            </th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr
              key={product.product_id}
              className="border-b"
            >
              <td className="py-2">
                {product.product_name}
              </td>

              <td className="text-right">
                {product.stock_quantity}
              </td>

              <td className="text-right">
                Ks {product.unit_price}
              </td>

              <td className="text-right font-semibold">
                Ks {product.stock_value}
              </td>
            </tr>
          ))}

          {products.length === 0 && (
            <tr>
              <td
                colSpan={4}
                className="py-4 text-center text-gray-500"
              >
                No inventory data.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
